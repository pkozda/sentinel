import { User } from "../domain/user";
import { Role } from "../domain/role";
import { Permission } from "../domain/permission";
import { Rule } from "../domain/rule";
import { Condition } from "../domain/condition";
import { AccessDecision } from "./access-decision";

interface AccessEvaluatorContext {
	resource: string;
	action: string;
	user: User;
	roles: Role[];
	permissions: Permission[];
	rules: Rule[];
}

export class AccessEvaluator {
	evaluate(ctx: AccessEvaluatorContext): AccessDecision {
		const applicablePermissions = this.collectPermissions(ctx);

		for (const permission of applicablePermissions) {
			for (const rule of permission.rules) {
				if (this.matchesRule(rule, ctx)) {
					if (permission.effect === "deny") {
						return {
							result: "deny",
							matchedPermissions: [permission.id],
							reason: "Access denied",
						};
					}

					return {
						result: "allow",
						matchedPermissions: [permission.id],
						reason: "Access allowed",
					};
				}
			}
		}

		return {
			result: "deny",
			matchedPermissions: [],
			reason: "No applicable permissions found",
		};
	}

	private collectPermissions(ctx: AccessEvaluatorContext): Permission[] {
		const rolePermissions = ctx.roles
			.filter(role => ctx.user.roleIds.includes(role.id))
			.flatMap(role => role.permissionIds);

		return ctx.permissions
			.filter(p => rolePermissions.includes(p.id))
			.sort((a, b) => b.priority - a.priority);
	}

	private matchesRule(rule: Rule, ctx: AccessEvaluatorContext): boolean {
		if (rule.resource !== ctx.resource) return false;
		if (rule.action !== ctx.action) return false;
		if (!rule.condition) return true;

		return this.evaluateCondition(rule.condition, ctx.user);
	}

	private evaluateCondition(condition: Condition, user: User): boolean {
		if (condition.type === "attribute") {
			const userValue = (user.attributes as any)[condition.field];
			switch (condition.operator) {
				case "equals":
					return userValue === condition.value;
				case "notEquals":
					return userValue !== condition.value;
				case "in":
					return (condition.value as string[]).includes(userValue);
				case "gt":
					return userValue > (condition.value as number);
				case "lt":
					return userValue < (condition.value as number);
			}
		}
		return false;
	}
}
