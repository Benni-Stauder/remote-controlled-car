import { createFileRoute } from '@tanstack/react-router'
import useRtspStream from "@/lib/rtc_handler.ts";

export const Route = createFileRoute('/streamtest')({
  component: () => <StreamTest />
})


function StreamTest () {
    useRtspStream("video", "url goes here");

    return (
        <>
            <h1>Stream test</h1>
            <video id="video" autoPlay className="border-2 border-black"/>
        </>
    )
}