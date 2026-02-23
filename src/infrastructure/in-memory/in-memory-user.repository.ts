import { User } from "@/core/domain/user";
import { UserRepository } from "@/core/repositories/user.repository";

export class InMemoryUserRepository implements UserRepository {
	private users: Map<string, User>;

	constructor(initialUsers: User[] = []) {
		this.users = new Map(initialUsers.map(u => [u.id, u]));
	}

	async findById(id: string): Promise<User | null> {
		return this.users.get(id) ?? null;
	}

	save(user: User): void {
		this.users.set(user.id, user);
	}
}
