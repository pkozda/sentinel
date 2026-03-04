"use client";

import { useState } from "react";
import { createContainer } from "@/composition/container";

const container = createContainer();

const users = [
	{ id: "u1", label: "Employee (u1)" },
	{ id: "admin1", label: "Admin (admin1)" },
];

const resources = ["database"];
const actions = ["read", "write"];

export default function AccessPlayground() {
	const [userId, setUserId] = useState("u1");
	const [resource, setResource] = useState("database");
	const [action, setAction] = useState("read");
	const [result, setResult] = useState<string | null>(null);
	const [reason, setReason] = useState<string | null>(null);

	async function handleEvaluate() {
		const decision = await container.evaluateAccessUseCase.execute({
			userId,
			resource,
			action,
		});

		setResult(decision.result);
		setReason(decision.reason);
	}

	return (
		<main style={{ padding: 40, fontFamily: "sans-serif" }}>
			<h1>Sentinel Access Hub</h1>
			<h2>Access Playground</h2>

			<div style={{ marginBottom: 20 }}>
				<label>User:</label>
				<br />
				<select
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				>
					{users.map((u) => (
						<option key={u.id} value={u.id}>
							{u.label}
						</option>
					))}
				</select>
			</div>

			<div style={{ marginBottom: 20 }}>
				<label>Resource:</label>
				<br />
				<select
					value={resource}
					onChange={(e) => setResource(e.target.value)}
				>
					{resources.map((r) => (
						<option key={r} value={r}>
							{r}
						</option>
					))}
				</select>
			</div>

			<div style={{ marginBottom: 20 }}>
				<label>Action:</label>
				<br />
				<select
					value={action}
					onChange={(e) => setAction(e.target.value)}
				>
					{actions.map((a) => (
						<option key={a} value={a}>
							{a}
						</option>
					))}
				</select>
			</div>

			<button onClick={handleEvaluate}>
				Evaluate Access
			</button>

			{result && (
				<div style={{ marginTop: 30 }}>
					<h3>Decision</h3>
					<p>
						<strong>Result:</strong>{" "}
						<span
							style={{
								color:
									result === "allow"
										? "green"
										: "red",
							}}
						>
							{result.toUpperCase()}
						</span>
					</p>
					<p>
						<strong>Reason:</strong> {reason}
					</p>
				</div>
			)}
		</main>
	);
}