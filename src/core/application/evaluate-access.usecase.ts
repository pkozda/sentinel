import { AccessEvaluator } from "../access-evaluator/access-evaluator";
import { User } from "../domain/user";
import { Role } from "../domain/role";
import { Permission } from "../domain/permission";
import { Rule } from "../domain/rule";

import { UserRepository } from "../repositories/user.repository";
import { RoleRepository } from "../repositories/role.repository";
import { PermissionRepository } from "../repositories/permission.repository";

export class EvaluateAccessUseCase {
    constructor(
        private userRepo: UserRepository,
        private roleRepo: RoleRepository,
        private permissionRepo: PermissionRepository,
        private evaluator: AccessEvaluator,
    ) {}
    async execute(params: {
        userId: string;
        resource: string;
        action: string;
    }) {
        const user = await this.userRepo.findById(params.userId);
        if (!user) {
        throw new Error("User not found");
        }

        const roles = await this.roleRepo.findByIds(user.roleIds);

        const permissionIds = roles.flatMap(r => r.permissionIds);
        const permissions = await this.permissionRepo.findByIds(permissionIds);

        return this.evaluator.evaluate({
            user,
            roles,
            permissions,
            resource: params.resource,
            action: params.action,
            rules: [],
        });
    }
}
