import { useStore } from "@/lib/store";
import Connector, { ConnectionSteps } from "./connector";
import Hls from 'hls.js';
import {useEffect, useRef} from 'react';

interface VideoScreenProps {
  steps: ConnectionSteps[];
}
interface Props {
  preview?: boolean;
}


export const VideoScreen = ({
  steps,
}: VideoScreenProps) => {
  const { state: { connected, connecting } } = useStore();
  const videoRef = useRef(null);

  

  useEffect(() => {
    const video = videoRef.current as unknown as HTMLVideoElement;
    if (!video) return;

    let hls: Hls;
    //hier slalsl

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource('http://127.0.0.1:3030/stream.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("fgdhsjaklksjdhfdjskal");
        video.play().catch(
            error => {
          console.error('Autoplay was prevented');
          console.error(error)
              video.removeAttribute('autoplay'); // Remove autoplay attribute
              video.setAttribute('controls', ''); // Add controls attribute
              video.addEventListener('click', function() {
                video.play(); // Start playback on click
              });
          // Handle further UI or state changes if needed
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'http://127.0.0.1:3030/stream.m3u8';
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {
          console.error('Autoplay was prevented');
          // Handle further UI or state changes if needed
        });
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
      <div
          className={
            "relative flex h-[100%] aspect-video overflow-hidden items-center justify-center bg-muted rounded-md"
          }
      >
        {/* Das Video wird nur angezeigt, wenn `connected` true ist */}
        {connected && (
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <video ref={videoRef} controls muted className="w-full h-full object-cover absolute z-[-1]" />
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

              <ConnectedScreen/>
              </div>
            </div>
        )}
        {/* Alternativen, wenn nicht connected */}
        {!connected && (connecting ? (
            <Connector test={steps} />
        ) : (
            <div>Not connected</div>
        ))}
      </div>
  );

};

export const ConnectedScreen = () => {
  const {
    state: {
      settings: {
        dashboard: {
          rpm,
          maxSpeed,
          velocity,
          map,
          breakPercentage,
          lateralAcceleration,
        },
      },
    },
  } = useStore();
  return (
    <>
      {map ? <GoogleMaps /> : null}
      <Gauges rpm={rpm} maxSpeed={maxSpeed} velocity={velocity} />
      {lateralAcceleration ? <LateralAcceleration /> : null}
      {breakPercentage ? <BrakePercentage /> : null}
    </>
  );
};

interface GaugesProps {
  preview?: boolean;
  maxSpeed?: boolean;
  rpm?: boolean;
  velocity?: boolean;
}
export const Gauges = ({
  preview = false,
  maxSpeed = true,
  rpm = true,
  velocity = true,
}: GaugesProps) => {
  const { state: { settings: { speed } } } = useStore()
  const liveSpeed = useStore(state => state.state.livedata.speed)
  const liveRpm = useStore(state => state.state.livedata.rpm)
  


  return (
    <>
      <div
        className={`absolute flex justify-between items-center space-x-20 ${preview ? "-bottom-10" : "-bottom-24"}`}
      >
        {rpm ? (
          <div
            className={` rounded-full bg-pink-300 border-black border-2 -bottom-20 -right-25 items-center flex justify-center ${preview ? "w-32 h-32" : "w-64 h-64"} border-2  object-cover`}
          >
            <div
              className={` rounded-full bg-white  border-2 -bottom-20 -right-25 items-center flex justify-center ${preview ? "w-28 h-28" : "w-56 h-56"} border-2 object-cover`}
            >
              <div
                className={`absolute  font-bold ${preview ? "text-lg top-8" : "text-5xl top-16"}`}
              >
                {liveRpm}
              </div>

              <div
                className={`absolute  font-bold ${preview ? "text-xs top-30" : "text-lg top-28"}`}
              >
                rpm
              </div>
            </div>
          </div>
        ) : null}

        {velocity ? (
          <div
            className={` rounded-full bg-green-300 border-black border-2 -bottom-20 -right-25 items-center flex justify-center ${preview ? "w-32 h-32" : "w-64 h-64"} border-2  object-cover`}
          >
            <div
              className={` rounded-full bg-white  border-2 -bottom-20 -right-25 items-center flex justify-center ${preview ? "w-28 h-28" : "w-56 h-56"} border-2 object-cover`}
            >
              <div
                className={`absolute  font-bold ${preview ? "text-lg top-8" : "text-5xl top-16"}`}
              >
                {liveSpeed}
              </div>
              {maxSpeed ? (
                <div
                  className={`absolute  font-bold ${preview ? "text-xs top-30" : "text-lg top-28"}`}
                >
                  Max Speed: {speed}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export const GoogleMaps = ({ preview = false }: Props) => {
  return (
    <img
      src="public/dat_place.png"
      alt="map"
      className={`flex absolute top-0 right-0 ${preview ? "w-32 h-32" : "w-48 h-48"} border-2 border-black object-cover`}
    />
  );
};

export const LateralAcceleration = ({ preview = false }: Props) => {
  const {state: {livedata: {lateralAcceleration}}} = useStore();
  return (
    <div
      className={`absolute ${preview ? "h-36 w-16 -right-10 top-[100px]" : "h-64 w-28 -right-16 top-36"} bg-white border-2 border-black z-50 rounded-full -rotate-90 `}
    >
      <div
        className={` ${preview ? "h-12 w-12 -right-1.5 -bottom-1.5 text-xs" : "w-24 h-24 -right-1.5 -bottom-1.5 text-lg"} relative  bg-gray-200 rounded-full flex items-center justify-center rotate-90 font-bold  `}
      >
        {lateralAcceleration} <sup>m</sup>&frasl;
        <sub>
          s<sup>2</sup>
        </sub>
      </div>
    </div>
  );
};
export const BrakePercentage = ({ preview = false }: Props) => {
  const {state: {livedata: {brakePercentage}}} = useStore();
  return (
    <div
      className={`absolute ${preview ? "h-36 w-16 -right-10 top-44" : "h-64 w-28 -right-16 top-72"} bg-white border-2 border-black z-50 rounded-full -rotate-90 `}
    >
      <div
        className={` ${preview ? "h-12 w-12 -right-1.5 -bottom-1.5 text-xs" : "w-24 h-24 -right-1.5 -bottom-1.5 text-lg"} relative  bg-gray-200 rounded-full flex items-center justify-center rotate-90 font-bold  `}
      >
        {brakePercentage} %
      </div>
    </div>
  );
};
