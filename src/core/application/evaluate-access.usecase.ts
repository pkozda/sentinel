import { AccessEvaluator } from "../access-evaluator/access-evaluator";
import { User } from "../domain/user";
import { Role } from "../domain/role";
import { Permission } from "../domain/permission";
import { Rule } from "../domain/rule";

export class EvaluateAccessUseCase {
    constructor(private evaluator: AccessEvaluator) {}
    execute(params: {
        user: User;
        permissions: Permission[];
        roles: Role[];
        rules: Rule[];
        resource: string;
        action: string;
    }) {
        return this.evaluator.evaluate(params);
    }
}
