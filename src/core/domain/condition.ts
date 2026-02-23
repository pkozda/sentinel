export type ConditionType = "attribute" | "time";

export type ConditionOperator = "equals" | "notEquals" | "in" | "gt" | "lt";

export interface Condition {
	type: ConditionType;
	operator: ConditionOperator;
	field: string;
	value: unknown;
}
