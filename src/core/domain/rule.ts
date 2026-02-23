import { Condition } from "./condition";

export type ResourceType = "database" | "dashboard" | "hr-record" | "activity-log";
export type ActionType = "read" | "write" | "delete" | "manage";

export interface Rule {
	resource: ResourceType;
	action: ActionType;
	condition?: Condition;
}
