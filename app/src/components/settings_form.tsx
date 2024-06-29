import AssistanceSystems from "./assistance_systems";
import DashboardCustomization from "./dashboard_customization";
import SpeedSettings from "./speed_settings";
import { Separator } from "./ui/separator";

export default function SettingsForm() {
	return (
		<>
			<div className="relative flex lg:w-full xl:flex-col 2xl:flex-col  sm:height-[70%] sm:flex-col items-stretch">
				<div className="relative w-full grid grid-rows-2">
					<SpeedSettings />
					<AssistanceSystems />
				</div>
				<div className="pl-3 flex relative">
					<Separator orientation="horizontal" />
				</div>

				<div className="w-full">
					<DashboardCustomization />
				</div>
			</div>
		</>
	);
}
