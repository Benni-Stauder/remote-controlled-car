import { createRootRoute,  Outlet } from '@tanstack/react-router'
import {useStore} from "@/lib/store.ts";
import {useEffect, useState} from "react";

export const Route = createRootRoute({
    component: () => <Index />
})


function Index () {

    const {actions: {setWebsocket, livedata: {setLiveData}}} = useStore()
    const [data, setData] = useState({
        speed: null,
        rpm: null,
        lateralAcceleration: null,
        brakePercentage: null
    });
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000")


        ws.onopen = () => {
            console.log("WebSocket connection established.");
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
        };

        ws.onclose = () => {
            console.log("WebSocket is closed now.");
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        setLiveData(data.speed as unknown as number , data.rpm as unknown as number, data.lateralAcceleration as unknown as number, data.brakePercentage as unknown as number)
    }, [data]);



    return (
        <div className='h-screen w-screen'>
            <Outlet/>
        </div>
    )
}