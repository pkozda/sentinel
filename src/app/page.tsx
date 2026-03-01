"use client";

import { useState } from "react";
import { createContainer } from "@/composition/container";

const container = createContainer();

export default function HomePage() {
	const [result, setResult] = useState<string | null>(null);

	async function handleCheck() {
		const decision = await container.evaluateAccessUseCase.execute({
			userId: "u1",
			resource: "database",
			action: "read",
		});

		setResult(decision.result);
	}

	return (
		<main style={{ padding: 32 }}>
			<h1>Sentinel Access Hub</h1>
			<button onClick={handleCheck}>Evaluate Access</button>
			{result && <p>Decision: {result}</p>}
		</main>
	);
}
