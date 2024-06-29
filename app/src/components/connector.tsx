import { useEffect, useState } from "react";

export interface ConnectionSteps {
	step: string;
	status: "connected" | "pending" | "not_connected" | "error";
	errormessage?: string;
}

export default function Connector({ test }: { test: ConnectionSteps[] }) {
	return (
		<div className="space-y-3">
			{test.map((x) => (
				<Step key={x.step} step={x.step} status={x.status} />
			))}
		</div>
	);
}

function Step({ step, status }: ConnectionSteps) {
	const [color, setColor] = useState("bg-gray-600");
	const [animation, setAnimation] = useState("");

	useEffect(() => {
		switch (status) {
			case "connected":
				setColor("bg-green-600");
				setAnimation("");
				break;
			case "pending":
				setColor("bg-orange-600");
				setAnimation("animate-pulse");
				break;
			case "not_connected":
				setColor("bg-gray-600");
				setAnimation("");
				break;
			case "error":
				setColor("bg-red-600");
				setAnimation("");
				break;
		}
	}, [status]);

	return (
		<div className="p-4 border bg-white rounded-lg w-full max-w-sm space-x-3">
			<div className="flex items-center gap-6 justify-between">
				<h3 className="text-sm font-semibold">{step}</h3>
				<div className={`rounded-full w-2 h-2 ${color} ${animation}`} />
			</div>
		</div>
	);
}
