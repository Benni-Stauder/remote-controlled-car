import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ConnectionSteps } from "@/components/connector";
import {useEffect, useState} from "react";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { VideoScreen } from "@/components/videoscreen";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Home,
});


export default function Home() {

  const {actions: {setWebsocket, livedata: {setLiveData}}} = useStore()

  const [data, setData] = useState({
    speed: null,
    rpm: null,
    lateralAcceleration: null,
    brakePercentage: null
  });



  useEffect(() => {
    setLiveData(data.speed as unknown as number , data.rpm as unknown as number, data.lateralAcceleration as unknown as number, data.brakePercentage as unknown as number)
  }, [data]);




  const {
    state: { websocket, connecting, connected, steps},
    actions: { setConnecting, setConnected, setSteps, steps: {setStatus}}
  } = useStore();


  function ConnectWebsocket () {
    const ws = new WebSocket("ws://localhost:8000")


    ws.onopen = () => {
      console.log("WebSocket connection established.");
      setStatus(0,"connected")
      setStatus(1,"connected")
      setWebsocket(ws)
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(prevData => ({
        ...prevData,
        ...newData
      }));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      const newSteps = [...steps]
      setStatus(0,"error")
      setStatus(1,"error")
      setSteps(newSteps)
    };

    ws.onclose = () => {
      console.log("WebSocket is closed now.");
    };

    return () => {
      ws.close();
    };
  }


  const connect = () => {
    setConnecting(true)
    ConnectWebsocket()
    console.log("hello")


    console.log(steps[1])
    if (websocket && websocket.readyState === websocket.CONNECTING) {
      setStatus(0, "pending")
      setStatus(1, "pending")

    }

    if (steps[1].status === "connected" && steps[2].status === "connected") {
      setConnecting(false)
      setConnected(true)
    }


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
                disabled={connected}
                onClick={connect}
            >
              Connect
            </Button>
            <Button
                className="h-10"
                variant="outline"
                disabled={!connected}
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