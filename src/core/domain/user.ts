export interface UserAttributes {
	department: string;
	position: string;
	seniorityLevel: string;
	location: string;
	active: boolean;
}

export interface User {
	id: string;
	attributes: UserAttributes;
	roleIds: string[];
}
