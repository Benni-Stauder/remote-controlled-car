import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  state: {
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
      setSpeed: (x: number) => void;
      setRpm: (x: number) => void;
      setLateralAcceleration: (x: number) => void;
      setBrakePercentage: (x: number) => void;
    };
  };
};

export const useStore = create<State & Actions>()(
  immer((set) => ({
    state: {
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
        setSpeed: (x) =>
          set((state) => {
            state.state.livedata.speed = x;
          }),
        setRpm: (x) =>
          set((state) => {
            state.state.livedata.rpm = x;
          }),
        setLateralAcceleration: (x) =>
          set((state) => {
            state.state.livedata.lateralAcceleration = x;
          }),
        setBrakePercentage: (x) =>
          set((state) => {
            state.state.livedata.brakePercentage = x;
          }),
      },
    },
  }))
);
