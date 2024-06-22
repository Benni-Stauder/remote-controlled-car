import DashboardPreview from "@/components/dashboard_preview";
import Header from "@/components/header";
import SettingsForm from "@/components/settings_form";
import { Separator } from "@radix-ui/react-separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
	component: Page,
});

function Page() {
	return (
		<div className="flex flex-col w-full h-full overflow-hidden">
			<Header />
			<div className="flex h-full">
				<SettingsForm />
				<DashboardPreview />
			</div>
		</div>
	);
}
