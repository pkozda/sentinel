import { Role } from "./role";

export type PermissionEffect = "allow" | "deny";


export interface Permission {
    id: string;
    name: string;
    effect: PermissionEffect;
    priority: number;
    roles: Role[];
}
