import { User } from "@/core/domain/user";
import { Role } from "@/core/domain/role";
import { Permission } from "@/core/domain/permission";

export const SEED_USERS: User[] = [
	{
		id: "u1",
		attributes: {
			department: "engineering",
			position: "engineer",
			seniorityLevel: "senior",
			location: "DE",
			active: true,
		},
		roleIds: ["r1"],
	},
	{
		id: "admin1",
		attributes: {
			department: "engineering",
			position: "admin",
			seniorityLevel: "senior",
			location: "DE",
			active: true,
		},
		roleIds: ["admin"],
	},
];

export const SEED_ROLES: Role[] = [
	{
		id: "r1",
		name: "Viewer",
		permissionIds: ["perm1"],
	},
	{
		id: "admin",
		name: "Admin",
		permissionIds: ["perm1", "perm2"],
	},
];

export const SEED_PERMISSIONS: Permission[] = [
	{
		id: "perm1",
		name: "Database read",
		effect: "allow",
		priority: 1,
		rules: [{ resource: "database", action: "read" }],
	},
	{
		id: "perm2",
		name: "Database write",
		effect: "allow",
		priority: 1,
		rules: [{ resource: "database", action: "write" }],
	},
];
