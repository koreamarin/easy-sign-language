import { useRef, useState, useEffect } from "react";


function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);

	const [videoSize, setVideoSize] = useState<{
		width: number;
		height: number;
	}>();

	const animate = () => {
		if (videoRef.current &&
				videoRef.current.currentTime !== lastVideoTimeRef.current) {
			lastVideoTimeRef.current = videoRef.current.currentTime;
		}
		requestRef.current = requestAnimationFrame(animate);
	};
	
	useEffect(() => {
		const getUserCamera = async () => {
		  try {
			const stream = await navigator.mediaDevices.getUserMedia({
			  video: true,
			});
			if (videoRef.current) {
			  videoRef.current.srcObject = stream;
			  videoRef.current.onloadedmetadata = () => {
				setVideoSize({
				  width: videoRef.current!.offsetWidth,
				  height: videoRef.current!.offsetHeight,
				});
				videoRef.current!.play();
	
				// Start animation once video is loaded
				requestRef.current = requestAnimationFrame(animate);
			  };
			}
		  } catch (e) {
			console.log(e);
			alert("Failed to load webcam!");
		  }
		};
		getUserCamera();
	
		return () => cancelAnimationFrame(requestRef.current);
	  }, []);
    
    return(
        <div>
			<video
            className="w-full h-auto"
            ref={videoRef}
            loop={true}
            muted={true}
            autoPlay={true}
            playsInline={true}
            style={{width:"20%",  transform : "rotateY(180deg)"}}
          ></video>
        </div>
    )
}

export default Camera;