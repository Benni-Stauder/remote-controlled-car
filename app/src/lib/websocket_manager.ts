class WebSocketManager {
    private static instance: WebSocket | null = null;

    static getInstance(url: string): WebSocket {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocket(url);
        }
        return WebSocketManager.instance;
    }
}

export default WebSocketManager;