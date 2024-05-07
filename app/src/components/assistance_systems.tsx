import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/store";

export default function AssistanceSystems() {
  const {
    state: {
      settings: { mode, assistance },
    },
    actions: {
      settings: { setAssistance },
    },
  } = useStore();
  const isNotPro = mode !== "pro";
  return (
    <div className="flex flex-col p-5 h-auto">
      <div className="flex justify-center h-auto mb-5">
        <h2 className={`text-xl font-bold ${isNotPro ? "opacity-50" : ""}`}>
          Driver Assistance Systems
        </h2>
      </div>

      <div className="flex w-full justify-center space-x-2">
        <div className={`font-semibold ${isNotPro ? "opacity-50" : ""}`}>
          {assistance ? "Enabled" : "Disabled"}
        </div>
        {" "}
        <Switch
          checked={assistance}
          disabled={isNotPro}
          onClick={() => setAssistance(!assistance)}
        />
      </div>
    </div>
  );
}

