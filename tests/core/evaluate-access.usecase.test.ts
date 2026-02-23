import { describe, it, expect } from "vitest";
import { AccessEvaluator } from "@/core/access-evaluator/access-evaluator";
import { EvaluateAccessUseCase } from "@/core/application/evaluate-access.usecase";
import { InMemoryUserRepository } from "@/infrastructure/in-memory/in-memory-user.repository";
import { InMemoryRoleRepository } from "@/infrastructure/in-memory/in-memory-role.repository";
import { InMemoryPermissionRepository } from "@/infrastructure/in-memory/in-memory-permission.repository";
import { Permission } from "@/core/domain/permission";

describe("EvaluateAccessUseCase (integration)", () => {
	it("returns allow decision through full repository chain", async () => {
		const userRepo = new InMemoryUserRepository([
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
		]);

		const roleRepo = new InMemoryRoleRepository([
			{
				id: "r1",
				name: "Role 1",
				permissionIds: ["perm1"],
			},
		]);

		const permissions: Permission[] = [
			{
				id: "perm1",
				name: "Permission 1",
				effect: "allow",
				priority: 1,
				rules: [
					{
						resource: "database",
						action: "read",
					},
				],
			},
		];
		const permissionRepo = new InMemoryPermissionRepository(permissions);

		const evaluator = new AccessEvaluator();

		const useCase = new EvaluateAccessUseCase(
			userRepo,
			roleRepo,
			permissionRepo,
			evaluator
		);

		const decision = await useCase.execute({
			userId: "u1",
			resource: "database",
			action: "read",
		});

		expect(decision.result).toBe("allow");
	});
});
