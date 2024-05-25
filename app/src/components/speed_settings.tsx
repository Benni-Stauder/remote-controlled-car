import { Slider } from "@/components/ui/slider";
import { useStore } from "@/lib/store";
import { Input } from "./ui/input";

export default function SpeedSettings() {
  const {
    state: {
      settings: { speed, mode },
    },
    actions: {
      settings: { setSpeed },
    },
  } = useStore();
  const isChild = mode === "child";
  return (
    <div className="flex flex-col p-5 h-auto">
      <div className="flex justify-center h-auto">
        <h2 className="text-xl font-bold">Max Speed</h2>
      </div>

      <div className="flex h-full w-full justify-between items-center space-x-2">
        <Slider
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
          max={isChild ? 50 : 100}
          step={1}
        />
        <Input
          type="number"
          value={speed}
          onChange={(event) => {
            setSpeed(event.target.value as unknown as number);
          }}
          min={10}
          max={100}
        />
      </div>
    </div>
  );
}
