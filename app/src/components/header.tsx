import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Button } from "./ui/button";

export default function Header() {
  const {
    state: {
      settings: { mode },
    },
    actions: {
      settings: {
        setMode,
        setAssistance,
        setSpeed,
        dashboard: {
          setLateralAcceleration,
          setMaxSpeed,
          setRpm,
          setMap,
          setBreakPercentage,
          setVelocity }
      },
    },
  } = useStore();

  return (
    <div className="grid grid-cols-3 m-5 mt-2">
      <div className="flex w-screen items-center">
        <Link to="/" className="flex items-center gap-2">
          <Button variant="outline" className="p-2 pr-4">
            <ChevronLeftIcon className=" h-6 mr-2" />
            Back
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-col sm:mt-4 mt-10">
        <h1 className="text-3xl font-bold pb-2 sm:mt-5 mt-10">Settings</h1>
        <div>
          <RadioGroup
            value={mode}
            className="flex space-x-2"
            onValueChange={(value) => {
              setMode(value);
              if (value === "child") {
                setSpeed(20);
                setMap(false);
                setRpm(true);
                setBreakPercentage(false);
                setAssistance(true);
                setLateralAcceleration(false);
                setVelocity(true);
                setMaxSpeed(true);
              }
              if (value === "default") {
                setSpeed(33);
                setMap(false);
                setRpm(true);
                setBreakPercentage(false);
                setAssistance(true);
                setLateralAcceleration(false);
                setVelocity(true);
                setMaxSpeed(true);
              }
              if (value === "pro") {
                setSpeed(33);
                setMap(false);
                setRpm(true);
                setBreakPercentage(true);
                setAssistance(true);
                setLateralAcceleration(true);
                setVelocity(true);
                setMaxSpeed(true);
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="child" id="r1" />
              <Label htmlFor="r1" className="text-base">
                Child
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r2" />
              <Label htmlFor="r2" className="text-base">
                Default
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pro" id="r3" />
              <Label htmlFor="r3" className="text-base">
                Pro
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
