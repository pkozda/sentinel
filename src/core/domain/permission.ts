import { Rule } from "./rule";

export type PermissionEffect = "allow" | "deny";


export interface Permission {
	id: string;
	name: string;
	effect: PermissionEffect;
	priority: number;
	rules: Rule[];
}
