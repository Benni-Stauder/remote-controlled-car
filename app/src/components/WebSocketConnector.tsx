import React, { useState, useEffect } from "react";

const WebSocketConnector = ({ onStatusChange }) => {
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:8000/");
        setWs(websocket);

        websocket.onopen = () => {
            console.log("WebSocket connection established.");
            onStatusChange({
                step: "Server Connection",
                status: "connected"
            });
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error: ", error);
            onStatusChange({
                step: "Server Connection",
                status: "error",
                errormessage: "Failed to connect to WebSocket server."
            });
        };

        websocket.onmessage = (event) => {
            console.log("Message from server: ", event.data);
            onStatusChange({
                step: "Data Reception",
                status: "connected"
            });
        };

        websocket.onclose = () => {
            console.log("WebSocket is closed now.");
            onStatusChange({
                step: "Server Connection",
                status: "not_connected"
            });
        };

        return () => {
            websocket.close();
        };
    }, [onStatusChange]);

    return null;
};

export default WebSocketConnector;
