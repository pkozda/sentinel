import { AccessEvaluator } from "@/core/access-evaluator/access-evaluator";
import { EvaluateAccessUseCase } from "@/core/application/evaluate-access.usecase";

import { InMemoryUserRepository } from "@/infrastructure/in-memory/in-memory-user.repository";
import { InMemoryRoleRepository } from "@/infrastructure/in-memory/in-memory-role.repository";
import { InMemoryPermissionRepository } from "@/infrastructure/in-memory/in-memory-permission.repository";

import { SEED_USERS, SEED_ROLES, SEED_PERMISSIONS } from "./seed-data";

export function createContainer() {
	const userRepo = new InMemoryUserRepository(SEED_USERS);
	const roleRepo = new InMemoryRoleRepository(SEED_ROLES);
	const permissionRepo = new InMemoryPermissionRepository(SEED_PERMISSIONS);

	const evaluator = new AccessEvaluator();

	const evaluateAccessUseCase = new EvaluateAccessUseCase(
		userRepo,
		roleRepo,
		permissionRepo,
		evaluator
	);

	return {
		evaluateAccessUseCase,
	};
}
