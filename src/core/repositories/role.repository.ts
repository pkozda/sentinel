import { Role } from "../domain/role";

export interface RoleRepository {
	findByIds(ids: string[]): Promise<Role[]>;
}
