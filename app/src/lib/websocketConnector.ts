import { useEffect } from 'react';
import WebSocketManager from "@/lib/websocket_manager.ts";
import {useStore} from "@/lib/store.ts";

interface Data  {
  speed: number;
  rpm: number;
  lateralAcceleration: number;
  brakePercentage: number;
}

const useWebsocketConnector = () => {
  const setWebsocket = useStore((state) => state.actions.setWebsocket);
  const {setLiveData} = useStore((state) => state.actions.livedata);

  useEffect(() => {
    const ws = WebSocketManager.getInstance("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data) as Data;
      setLiveData(newData.speed , newData.rpm , newData.brakePercentage, newData.lateralAcceleration);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket is closed now.");
    };

    return () => {
      // Cleanup event listeners
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;
    };
  }, [setWebsocket, setLiveData]);
};

export default useWebsocketConnector;