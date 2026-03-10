import { useState } from "react"

export function LoginForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		console.log("login", {
			username,
			password
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Username</label>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div>
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<button type="submit">Login</button>
		</form>
	)
}
