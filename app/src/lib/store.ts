import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {ConnectionSteps} from "@/components/connector.tsx";


type State = {
  state: { counter: number,
    websocket: WebSocket | null;
    steps: ConnectionSteps[],
    connected: boolean;
    connecting: boolean;
    settings: {
      mode: string;
      speed: number;
      assistance: boolean;
      dashboard: {
        velocity: boolean;
        rpm: boolean;
        lateralAcceleration: boolean;
        breakPercentage: boolean;
        map: boolean;
        maxSpeed: boolean;
      };
    };
    livedata: {
      speed: number;
      rpm: number;
      lateralAcceleration: number;
      brakePercentage: number;
    };
  };
};

type Actions = {
  actions: {
      setSteps: (x: ConnectionSteps[]) => void;
      steps: {
          setStatus: (index: number, status: "connected" | "pending" | "error") => void
      },
    setWebsocket: (ws: WebSocket) => void;
    setConnecting: (connecting: boolean) => void;
    setConnected: (connected: boolean) => void;
    settings: {
      setMode: (mode: string) => void;
      setSpeed: (speed: number) => void;
      setAssistance: (assistance: boolean) => void;
      dashboard: {
        setVelocity: (velocity: boolean) => void;
        setRpm: (rpm: boolean) => void;
        setLateralAcceleration: (lateralAcceleration: boolean) => void;
        setBreakPercentage: (breakPercentage: boolean) => void;
        setMap: (map: boolean) => void;
        setMaxSpeed: (maxSpeed: boolean) => void;
      };
    };
    livedata: {
      setLiveData: (speed: number, rpm: number, accel: number, brake: number) => void;
    };
  };
};

export const useStore = create<State & Actions>()(
    immer((set) => ({
      state: {
          counter: 0,
          steps: [
              {
                  step: "Connecting to Server",
                  status: "pending",
              },
              {
                  step: "Connecting Steering wheel",
                  status: "pending",
              },
              {
                  step: "Connecting to Webcam",
                  status: "pending",
              },
          ],
        websocket: new WebSocket(""),
        connected: false,
        connecting: false,
        settings: {
          mode: "default",
          speed: 33,
          assistance: true,
          dashboard: {
            velocity: true,
            rpm: true,
            lateralAcceleration: false,
            breakPercentage: false,
            map: false,
            maxSpeed: true,
          },
        },
        livedata: {
          speed: 0,
          rpm: 0,
          lateralAcceleration: 0,
          brakePercentage: 0,
        },
      },

      actions: {
        setSteps: (x) => set((state) => {
            state.state.steps = x
        }),
          steps: {
            setStatus: (index, status) => set((state) => {
                state.state.steps[index].status = status
                if (state.state.steps[0].status === "connected" && state.state.steps[1].status === "connected" && state.state.steps[2].status === "connected") {
                    state.state.connected = true
                    state.state.connecting = false
                }
            })
          },
        setWebsocket: (websocket) => set((state) => {state.state.websocket = websocket}),
        setConnecting: (connecting) =>
            set((state) => {
              state.state.connecting = connecting;
            }),
        setConnected: (connected) =>
            set((state) => {
              state.state.connected = connected;
            }),
        settings: {
          setMode: (mode) =>
              set((state) => {
                state.state.settings.mode = mode;
              }),
          setSpeed: (speed) =>
              set((state) => {
                state.state.settings.speed = speed;
              }),
          setAssistance: (assistance) =>
              set((state) => {
                state.state.settings.assistance = assistance;
              }),
          dashboard: {
            setVelocity: (velocity) =>
                set((state) => {
                  state.state.settings.dashboard.velocity = velocity;
                }),
            setRpm: (rpm) =>
                set((state) => {
                  state.state.settings.dashboard.rpm = rpm;
                }),
            setLateralAcceleration: (lateralAcceleration) =>
                set((state) => {
                  state.state.settings.dashboard.lateralAcceleration =
                      lateralAcceleration;
                }),
            setBreakPercentage: (breakPercentage) =>
                set((state) => {
                  state.state.settings.dashboard.breakPercentage = breakPercentage;
                }),
            setMap: (map) =>
                set((state) => {
                  state.state.settings.dashboard.map = map;
                }),
            setMaxSpeed: (maxSpeed) =>
                set((state) => {
                  state.state.settings.dashboard.maxSpeed = maxSpeed;
                }),
          },
        },
        livedata: {
          setLiveData: (speed: number, rpm: number, accel: number, brake: number) => set((state) => {
            state.state.livedata.speed = speed;
            state.state.livedata.rpm = rpm;
            state.state.livedata.lateralAcceleration = accel;
            state.state.livedata.brakePercentage = brake;
          }),
        },
      },
    }))
);