import { useEffect } from 'react';

const useRtspStream = (id: string, url: string) => {
  useEffect(() => {
    const pc = new RTCPeerConnection();
    const video = document.getElementById(id) as HTMLVideoElement;

    // Set up the ICE handling logic
    pc.onicecandidate = function (event) {
      if (event.candidate) {

        // idk what to do here lol
        console.log('ICE candidate:', event.candidate);
      }
    };

    pc.ontrack = function (event) {
      video.srcObject = event.streams[0];
    };

    // Fetch an offer from your signaling server
    fetch(`${url}/get_offer`)
        .then((response) => response.json())
        .then((offer) => pc.setRemoteDescription(new RTCSessionDescription(offer)))
        .then(() => pc.createAnswer())
        .then((answer) => pc.setLocalDescription(answer))
        .then(() => {
          const answer = pc.localDescription;
          fetch(`${url}/post_answer`, {
            method: 'POST',
            body: JSON.stringify(answer),
            headers: {'Content-Type': 'application/json'},
          });
        })
        .catch(console.error);

    // Clean Up Function
    return () => {
      if (pc) {
        pc.close();
      }
      if (video && video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
    };
  }, [id, url]);
};

export default useRtspStream;
