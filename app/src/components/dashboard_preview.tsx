import { useStore } from "@/lib/store";
import { GoogleMaps, LateralAcceleration, BrakePercentage, Gauges } from "./videoscreen";

export default function DashboradPreview() {
  const {
    state: {
      settings: {
        dashboard: {
          velocity,
          rpm,
          maxSpeed,
          breakPercentage,
          map,
          lateralAcceleration,
        },
      },
    },
  } = useStore();

  return (
    <div className="w-full overflow-hidden h-auto">
      {/* <Separator /> */}
      <div className="h-auto p-5 mb-5 aspect-video flex items-center justify-center overflow-hidden ">
        <div
          className="relative flex h-[90%] aspect-video overflow-hidden items-center justify-center bg-gray-200 rounded-md">
          {map ? <GoogleMaps preview={true} /> : null}
          {lateralAcceleration ? <LateralAcceleration preview={true} /> : null}
          {breakPercentage ? <BrakePercentage preview={true} /> : null}
          <Gauges
            preview={true}
            rpm={rpm}
            maxSpeed={maxSpeed}
            velocity={velocity}
          />
        </div>
      </div>
    </div>
  );
}
