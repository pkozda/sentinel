import { Permission } from "@/core/domain/permission";
import { PermissionRepository } from "@/core/repositories/permission.repository";

export class InMemoryPermissionRepository implements PermissionRepository {
	private permissions: Map<string, Permission>;

	constructor(initialPermissions: Permission[] = []) {
		this.permissions = new Map(initialPermissions.map(p => [p.id, p]));
	}

	async findByIds(ids: string[]): Promise<Permission[]> {
		return ids
		.map(id => this.permissions.get(id))
		.filter((p): p is Permission => Boolean(p));
	}

	save(permission: Permission): void {
		this.permissions.set(permission.id, permission);
	}
}
