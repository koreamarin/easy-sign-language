import { useEffect, useRef, useState } from "react";
import PoseLandmarkerCanvas from "../../poseModelComponents/Pose";
import PoseLandmarkerManager from "../../../poseModelLogic/PoseLandmarkManager";
import HandLandmarkerCanvas from "../../poseModelComponents/Hand";
import HandLandmarkerManager from "../../../poseModelLogic/HandLandmarkManager";
import AvatarCanvas from "../../Sonagi/AvatarCanvas";
import FaceLandmarkManager from "../../common/FaceLandmarkManager";

const CameraComponent = ({
  finResult,
  setSecond,
  ishidden,
  stopComp,
  currentWord,
  successModal,
  failModal,
}) => {
  // mediapipe 얼굴 매쉬 인식을 위한 클래스
  const [faceLandmarkManager, setFaceLandmarkManager] = useState(FaceLandmarkManager.getInstance());

  // 얼굴에 씌울 아바타 이름
  // Bear, Cat, Chicken, Deer, Dog, Elephant, Pig, Rabbit
  const [avatar, setAvatar] = useState("Dog");

  // avatar 모델 파일 불러오기
  const [modelUrl, setModelUrl] = useState(
    process.env.PUBLIC_URL + "/assets/mask/animal_face_pack.gltf"
  );

  // element에서 비디오 값을 가져와 저장
  const videoRef = useRef<HTMLVideoElement>(null);

  // 재생중임을 판단하기 위핸 변수
  const lastVideoTimeRef = useRef(-1);

  // 프레임 번호 저장 변수
  const requestRef = useRef(0);

  const videoView = true;
  const [videoSize, setVideoSize] = useState<{
    width: number;
    height: number;
  }>();

  // ================================상위 컴포넌트와 연동할 부분==========================

  let hookForTimer: boolean = false;

  let startTime: number;

  //
  const animate = () => {
    console.log(stopComp.current, "stopComp");
    if (stopComp.current) {
      setSecond(0);
      console.log("finResult: ", finResult);
      if (finResult.current === true) {
        successModal();
      } else {
        failModal();
      }
      return;
    }

    // 만약 비디오 element에서 가져온 값이 존재하고, 재생중(웹)인 시간과 마지막 비디오 시간과 일치하지 않으면
    // 즉 비디오가 실시간 재생중이면
    if (
      videoRef.current &&
      videoRef.current.currentTime !== lastVideoTimeRef.current &&
      !stopComp.current
    ) {
      //얼굴 mask용 얼굴 감지
      faceLandmarkManager.detectLandmarks(videoRef.current, performance.now());

      videoRef.current.muted = !ishidden;
      // 마지막 비디오 시간을 현재 비디오 시간으로 업데이트 후
      lastVideoTimeRef.current = videoRef.current.currentTime;
      try {
        // 커스텀한 PoseLandmarkerManger의 인스턴스를 생성한 후
        const poseLandmarkerManager = PoseLandmarkerManager.getInstance();

        // 인스턴스의 함수 detectLandmarks를 통해 비디오 프레임을 mediapipe를 통해 좌표를 뽑아낸 후
        // 인스턴스의 results변수에 저장
        poseLandmarkerManager.detectLandmarks(videoRef.current, performance.now());

        // 커스텀한 HandLandmarkerManager의 인스턴스 생성
        const handLandmarkerManager = HandLandmarkerManager.getInstance();

        // 인스턴스의 함수 detectLandmarks를 통해 mediapipe를 통해 좌표를 results에 저장
        handLandmarkerManager.detectLandmarks(videoRef.current, performance.now());

        if (!hookForTimer) {
          startTime = performance.now();
          hookForTimer = true;
        }

        setSecond(10 - Math.floor((performance.now() - startTime) / 1000));

        // 타이머, 10초 이상 실행될 시
        if (performance.now() - startTime > 10000) {
          // 컴포넌트 정지 및 오답처리(finResult의 default는 false)

          stopComp.current = true;
          console.log(stopComp.current);
        }
      } catch (error) {
        // 만약 에러 발생시 콘솔
        console.log(error);
      }
    }

    // 환경에서 프레임을 만들고 재생할 준비가 되면 animate 함수 실행
    // requestRef에 프레임 번호 저장
    requestRef.current = requestAnimationFrame(animate);
  };

  // 컴포넌트 마운트 될시 시작
  useEffect(() => {
    // 동기로
    const getUserCamera = async () => {
      try {
        // 유저의 카메라(웹캠)에 접근하여 미디어 스트림을 가져옴
        // 해당 함수(navigator.mediaDevices.getUserMedia)는 프로미스이므로
        // async - await을 이용하여 동기적 동작으로 변경시켜줌
        // 내부 인자는 video / audio 존재
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: { ideal: 30, max: 30 },
          },
        });

        // 만약 비디오 변수가 존재하면
        if (videoRef.current) {
          // 비디오 변수와 웹켐을 연결
          // 즉 웹켐으로 촬영되는 비디오가 비디오 변수에 저장됨
          // videoRef.current.srcObject = stream

          videoRef.current.srcObject = stream;

          // 연결된 웹켐의 메타데이터(주사율, 높이, 너비, 영상 품질...)을 불러옴
          videoRef.current.onloadedmetadata = () => {
            // 비디오 사이즈를 메타데이터를 통해 조절
            setVideoSize({
              width: videoRef.current!.offsetWidth,
              height: videoRef.current!.offsetHeight,
            });

            // 비디오가 존재하거나 하지않아도 비디오를 재생시킴
            videoRef.current!.play();
            requestRef.current = requestAnimationFrame(animate);
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    // getusercamera 함수 실행
    getUserCamera();

    // 언마운트 되기 직전 프레임 번호에 있는 에니메이션들을 정지
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div
      style={{
        width: "533px",
        height: "510px",
        borderRadius: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "40px",
        fontWeight: "bold",
        border: "1px solid black",
        position: "relative",
      }}
    >
      {/* 비디오 */}

      <video
        ref={videoRef}
        loop={true}
        muted={true}
        autoPlay={true}
        playsInline={true}
        style={{
          transform: "rotateY(180deg)",
          width: "533px",
          height: "510px",
          borderRadius: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      ></video>

      {videoSize && (
        <>{<AvatarCanvas width={533} height={510} url={modelUrl} avatar_name={avatar} />}</>
      )}

      {/* 캔버스 */}
      {videoSize && (
        <>
          {videoView && ishidden && (
            <PoseLandmarkerCanvas width={videoSize.width} height={videoSize.height} />
          )}
        </>
      )}
      {videoSize && ishidden && (
        <>
          {videoView && <HandLandmarkerCanvas width={videoSize.width} height={videoSize.height} />}
        </>
      )}
    </div>
  );
};

export default CameraComponent;
