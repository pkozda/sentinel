import { AccessEvaluator } from "@/core/access-evaluator/access-evaluator";
import { EvaluateAccessUseCase } from "@/core/application/evaluate-access.usecase";

import { InMemoryUserRepository } from "@/infrastructure/in-memory/in-memory-user.repository";
import { InMemoryRoleRepository } from "@/infrastructure/in-memory/in-memory-role.repository";
import { InMemoryPermissionRepository } from "@/infrastructure/in-memory/in-memory-permission.repository";

export function createContainer() {
	const userRepo = new InMemoryUserRepository();
	const roleRepo = new InMemoryRoleRepository();
	const permissionRepo = new InMemoryPermissionRepository();

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
