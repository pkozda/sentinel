import { Role } from "@/core/domain/role";
import { RoleRepository } from "@/core/repositories/role.repository";

export class InMemoryRoleRepository implements RoleRepository {
	private roles: Map<string, Role>;

	constructor(initialRoles: Role[] = []) {
		this.roles = new Map(initialRoles.map(r => [r.id, r]));
	}

	async findByIds(ids: string[]): Promise<Role[]> {
		return ids
		.map(id => this.roles.get(id))
		.filter((r): r is Role => Boolean(r));
	}

	save(role: Role): void {
		this.roles.set(role.id, role);
	}
}
