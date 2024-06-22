import {Slider} from "@/components/ui/slider";
import {useStore} from "@/lib/store";
import {Input} from "./ui/input";
import {useEffect, useRef} from "react";
import useWebsocketConnector from "@/lib/websocketConnector.ts";

export default function SpeedSettings() {
    const {
        state: {
            settings: {speed, mode, assistance},
            websocket
        },
        actions: {
            settings: {setSpeed},
        },
    } = useStore();
    useEffect(() => {
        // websocket.send(JSON.stringify(websocketMessage))
    }, [speed]);
    const isChild = mode === "child";

    return (
        <div className="flex flex-col p-5 h-auto">
            <div className="flex justify-center h-auto">
                <h2 className="text-xl font-bold">Max Speed</h2>
            </div>

            <div className="flex h-full w-full justify-between items-center space-x-2">
                <Slider
                    value={[speed]}
                    onValueChange={(value) => {
                        setSpeed(value[0])
                        const websocketMessage = {
                            "maxSpeed" : value[0],
                            "mode" : mode,
                            "assistance" : assistance
                        }
                        websocket?.send(JSON.stringify(websocketMessage))
                    }}
                    max={isChild ? 50 : 100}
                    step={1}
                />
                <input
                    type="number"
                    value={speed}
                    className={"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors "}
                    onChange={(event) => {
                        const websocketMessage = {
                            "maxSpeed" : event.target.value,
                            "mode" : mode,
                            "assistance" : assistance
                        }
                        websocket?.send(JSON.stringify(websocketMessage))
                        setSpeed(event.target.value as unknown as number);
                    }}
                    min={10}
                    max={100}
                />
            </div>
        </div>
    );
}
