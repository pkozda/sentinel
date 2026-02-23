import { Permission } from "../domain/permission";

export interface PermissionRepository {
    findByIds(ids: string[]): Promise<Permission[]>;
}
