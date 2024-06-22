import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ConnectionSteps } from "@/components/connector";
import {  useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { VideoScreen } from "@/components/videoscreen";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Home,
});

const default_steps: ConnectionSteps[] = [
  {
    step: "Connecting to Server",
    status: "pending",
  },
  {
    step: "Connecting Steering wheel",
    status: "not_connected",
  },
  {
    step: "Connecting to Webcam",
    status: "not_connected",
  },
];

export default function Home() {
  const {
    state: { connecting, connected},
    actions: { setConnecting, setConnected}
  } = useStore();
  const [steps, setSteps] = useState<ConnectionSteps[]>(default_steps);


  const connect = () => {
    let currentStepIndex = 0;
    setConnecting(true)
    setInterval(() => {
      if (currentStepIndex < steps.length) {
        const newSteps = [...steps];
        newSteps[currentStepIndex].status = "pending";

        setSteps(newSteps);

        setTimeout(() => {
          const newSteps = [...steps];
          newSteps[currentStepIndex].status = "connected";
          setSteps(newSteps);
          currentStepIndex++;
        }, 1500);

      }
      setConnected(steps.every(step => step.status === "connected"))
      if (connected) {
        console.log("we are connected")
        setConnecting(false)
        return;
      }
    }, 2000);

  }
  return (
      <div className="flex flex-col h-screen w-full">
        <div className="p-4 flex gap-4 justify-between w-full ">
          <div className="flex items-center mt-3 w-full">
            <h1 className="text-xl font-bold">Car Connector</h1>
          </div>
          <div className="flex items-center mt-3 w-full justify-center">
            <Button
                className="h-10"
                variant="outline"
                disabled={connecting}
                onClick={connect}
            >
              Connect
            </Button>
            <Button
                className="h-10"
                variant="outline"
                disabled={true}
                onClick={() => {
                  setConnecting(false);
                  setConnected(false);
                  const new_steps = steps.map(
                    (step) =>
                      ({ ...step, status: "not_connected" }) as ConnectionSteps
                  );
                  setSteps(new_steps);
                }}
            >
              Disconnect
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-4 w-full  justify-end">
            <div className="flex items-center gap-2">
              {connected ? (
                  <WifiIcon className="w-4 h-4 text-green-500" />
              ) : (
                  <WifiIcon className="w-4 h-4 text-red-500" />
              )}
              <div className="text-xs font-medium">
                {connected ? "Connected" : "Not Connected"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <VideoScreen
              steps={steps}
          />
        </div>
        <div className="flex items-center gap-2 w-full pb-5 pr-5 justify-end">
          <Link
              to="/settings"
              className="flex space-x-4 justify-evenly items-center h-auto"
          >
            <Cog6ToothIcon className="h-10 w-10 pl-1"></Cog6ToothIcon>
          </Link>
        </div>
      </div>
  );
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function WifiIcon(props: any) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M5 13a10 10 0 0 1 14 0" />
        <path d="M8.5 16.5a5 5 0 0 1 7 0" />
        <path d="M2 8.82a15 15 0 0 1 20 0" />
        <line x1="12" x2="12.01" y1="20" y2="20" />
      </svg>
  );
}