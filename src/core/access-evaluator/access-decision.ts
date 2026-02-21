export type AccessDecisionResult = "allow" | "deny";

export interface AccessDecision {
    result: AccessDecisionResult;
    matchedPermissions: string[];
    reason: string;
}
