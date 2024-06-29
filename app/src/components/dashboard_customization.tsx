
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/store";


export default function DashboardCustomization() {
	const {
		mode,
		dashboard: {
			velocity,
			lateralAcceleration,
			rpm,
			map,
			maxSpeed,
			breakPercentage,
		},
	} = useStore((state) => state.state.settings);
	const {
		setLateralAcceleration,
		setMap,
		setRpm,
		setVelocity,
		setBreakPercentage,
		setMaxSpeed,
	} = useStore((state) => state.actions.settings.dashboard);
	const isChild = mode === "child";

	return (
		<div className={`grid p-5 ${isChild ? "opacity-50" : ""}`}>
			<div className="flex justify-center mb-5">
				<h2 className="text-xl font-bold">Dashboard Customization</h2>
			</div>
			<div className="w-full grid grid-cols-4 ">
				<div className="flex w-full p-4">
					<div className=" cols-span-2 w-full">Velocity</div>
				</div>
				<div className="flex w-full justify-between p-4">
					<Switch
						checked={velocity}
						disabled={isChild}
						onCheckedChange={() => setVelocity(!velocity)}
					/>
				</div>
				<div className="flex w-full justify-between p-4">
					<h3 className="">Max Speed</h3>
				</div>
				<div className="flex w-full justify-between p-4">
					<Switch
						checked={maxSpeed}
						disabled={isChild}
						onCheckedChange={() => setMaxSpeed(!maxSpeed)}
					/>
				</div>

				<div className="flex w-full justify-between p-4">
					<h3 className="cols-span-2">Break Percentage</h3>
				</div>
				<div className="flex w-full justify-between p-4">
					<Switch
						checked={breakPercentage}
						disabled={isChild}
						onCheckedChange={() => setBreakPercentage(!breakPercentage)}
					/>
				</div>

				<div className="flex w-full justify-between p-4">
					<h3 className="">Lateral Acceleration</h3>
				</div>
				<div className="flex w-full justify-between p-4">
					<Switch
						checked={lateralAcceleration}
						disabled={isChild}
						onCheckedChange={() => setLateralAcceleration(!lateralAcceleration)}
					/>
				</div>

				<div className="flex w-full justify-between p-4">
					<h3 className="">Map</h3>
				</div>
				<div className="flex w-full justify-between p-4">
					<Switch
						checked={map}
						disabled={isChild}
						onCheckedChange={() => setMap(!map)}
					/>
				</div>

				<div className="flex w-full justify-between p-4">
					<h3 className="">Rpm</h3>
				</div>
				<div className="flex w-full justify-between p-4">
					<Switch
						checked={rpm}
						disabled={isChild}
						onCheckedChange={() => setRpm(!rpm)}
					/>
				</div>
			</div>
		</div>
	);
}
