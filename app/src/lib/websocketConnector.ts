import { useEffect, useState } from "react";


const useWebsocketConnector = (url: string) => {
  const [data, setData] = useState({
    speed: null,
    rpm: null,
    lateralAcceleration: null,
    brakePercentage: null
  });

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connection established.");
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
    };

    ws.onclose = () => {
      console.log("WebSocket is closed now.");
    };

    return () => {
      ws.close();
    };
  }, []);

  return data;
}

export default useWebsocketConnector;