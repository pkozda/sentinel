import { describe, it, expect } from "vitest";
import { AccessEvaluator } from "@/core/access-evaluator/access-evaluator";
import { Permission } from "@/core/domain/permission";

describe("AccessEvaluator", () => {
  it("allows access when matching allow permission exists", () => {
    const evaluator = new AccessEvaluator();

    const user = {
      id: "u1",
      attributes: {
        department: "engineering",
        position: "engineer",
        seniorityLevel: "senior",
        location: "DE",
        active: true,
      },
      roleIds: ["r1"],
    };

    const roles = [
      {
        id: "r1",
        name: "Role 1",
        permissionIds: ["perm1"],
      },
    ];

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

    const decision = evaluator.evaluate({
      user,
      roles,
      permissions,
      rules: [],
      resource: "database",
      action: "read",
    });

    expect(decision.result).toBe("allow");
    expect(decision.matchedPermissions).toContain("perm1");
  });

  it("deny overrides allow based on priority", () => {
    const evaluator = new AccessEvaluator();

    const user = {
      id: "u1",
      attributes: {
        department: "engineering",
        position: "engineer",
        seniorityLevel: "senior",
        location: "DE",
        active: true,
      },
      roleIds: ["r1"],
    };

    const roles = [
      {
        id: "r1",
        name: "Role 1",
        permissionIds: ["allowPerm", "denyPerm"],
      },
    ];

    const permissions: Permission[] = [
      {
        id: "allowPerm",
        name: "Allow Permission",
        effect: "allow",
        priority: 1,
        rules: [
          {
            resource: "database",
            action: "read",
          },
        ],
      },
      {
        id: "denyPerm",
        name: "Deny Permission",
        effect: "deny",
        priority: 10,
        rules: [
          {
            resource: "database",
            action: "read",
          },
        ],
      },
    ];

    const decision = evaluator.evaluate({
      user,
      roles,
      permissions,
      rules: [],
      resource: "database",
      action: "read",
    });

    expect(decision.result).toBe("deny");
    expect(decision.matchedPermissions).toContain("denyPerm");
  });
});
