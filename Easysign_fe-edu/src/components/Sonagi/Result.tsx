import { useEffect, useRef, useState } from "react";
import PoseLandmarkerCanvas from "../poseModelComponents/Pose";
import PoseLandmarkerManager from "../../poseModelLogic/PoseLandmarkManager";
import HandLandmarkerCanvas from "../poseModelComponents/Hand";
import HandLandmarkerManager from "../../poseModelLogic/HandLandmarkManager";
import CalculateTensor from "../../poseModelLogic/CalculateVector";
import AiResult from "../../poseModelLogic/AiModel";
import AvatarCanvas from "./AvatarCanvas";
import FaceLandmarkManager from "../common/FaceLandmarkManager";
import * as tf from "@tensorflow/tfjs";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/modules";

interface findMostElementResult {
  element: string;
  count: number;
}

interface LandmarkerCanvasProps {
  setSubmitWord: React.Dispatch<React.SetStateAction<string>>;
}

const LandmarkerCanvas = ({ setSubmitWord }: LandmarkerCanvasProps) => {
  // mediapipe 얼굴 매쉬 인식을 위한 클래스
  const faceLandmarkManager = FaceLandmarkManager.getInstance();

  const model = tf.loadLayersModel(process.env.PUBLIC_URL + "/model/game/sonagi/model.json");

  // 얼굴에 씌울 아바타 이름
  // Bear, Cat, Chicken, Deer, Dog, Elephant, Pig, Rabbit
  const avatar = useSelector((state: rootState) => state.avatar);

  // avatar 모델 파일 불러오기
  const modelUrl = process.env.PUBLIC_URL + "/assets/mask/animal_face_pack.gltf";
  // element에서 비디오 값을 가져와 저장
  const videoRef = useRef<HTMLVideoElement>(null);

  // 골격 숨기기
  const [ishidden, sethidden] = useState<boolean>(false);

  // const seq = useRef<object[]>([]);
  const seq: number[][] = [];

  // 재생중임을 판단하기 위핸 변수
  const lastVideoTimeRef = useRef(-1);

  // 프레임 번호 저장 변수
  const requestRef = useRef(0);

  const [videoSize, setVideoSize] = useState<{
    width: number;
    height: number;
  }>();

  // 버튼 클릭시 ishidden 변경
  const clickButton = () => {
    sethidden(!ishidden);
  };

  // ================================상위 컴포넌트와 연동할 부분==========================

  const resultList = [
    " ",
    "ㄱ",
    "ㄱ",
    "ㄴ",
    "ㄴ",
    "ㄷ",
    "ㄷ",
    "ㄹ",
    "ㄹ",
    "ㅁ",
    "ㅁ",
    "ㅂ",
    "ㅂ",
    "ㅅ",
    "ㅅ",
    "ㅇ",
    "ㅇ",
    "ㅈ",
    "ㅈ",
    "ㅊ",
    "ㅊ",
    "ㅋ",
    "ㅋ",
    "ㅌ",
    "ㅌ",
    "ㅍ",
    "ㅍ",
    "ㅎ",
    "ㅎ",
    "ㅏ",
    "ㅏ",
    "ㅑ",
    "ㅑ",
    "ㅓ",
    "ㅓ",
    "ㅕ",
    "ㅕ",
    "ㅗ",
    "ㅗ",
    "ㅛ",
    "ㅛ",
    "ㅜ",
    "ㅜ",
    "ㅠ",
    "ㅠ",
    "ㅡ",
    "ㅡ",
    "ㅣ",
    "ㅣ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅒ",
    "ㅔ",
    "ㅔ",
    "ㅖ",
    "ㅖ",
    "ㅚ",
    "ㅚ",
    "ㅟ",
    "ㅟ",
    "ㅢ",
    "ㅢ",
  ];

  // answer부분 상위로 올리기

  const finResultList: string[] = [];

  let answer: string = "";

  //
  const animate = () => {
    // 만약 비디오 element에서 가져온 값이 존재하고, 재생중(웹)인 시간과 마지막 비디오 시간과 일치하지 않으면
    // 즉 비디오가 실시간 재생중이면
    if (videoRef.current && videoRef.current.currentTime !== lastVideoTimeRef.current) {
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

        // 포즈 벡터 저장
        const poseResult = poseLandmarkerManager.getResults();

        // 커스텀한 HandLandmarkerManager의 인스턴스 생성
        const handLandmarkerManager = HandLandmarkerManager.getInstance();

        // 인스턴스의 함수 detectLandmarks를 통해 mediapipe를 통해 좌표를 results에 저장
        handLandmarkerManager.detectLandmarks(videoRef.current, performance.now());

        // 손 벡터 저장
        const handsResult = handLandmarkerManager.getResults();

        // 좌표 array 저장 공간들
        let poseArray = poseResult.landmarks[0];

        let rightArray: any[] = [];

        let leftArray: any[] = [];

        // 손의 탐지 영역에 따라 각 공간에 저장
        if (handsResult.handedness.length) {
          for (let [idx, value] of handsResult.handedness.entries()) {
            if (value[0].categoryName === "Left") {
              leftArray = handsResult.landmarks[idx];
            } else if (value[0].categoryName === "Right") {
              rightArray = handsResult.landmarks[idx];
            }
          }
        }

        // 텐서 계산 인스턴스 생성
        const calculateTensor = CalculateTensor.getInstance();

        // 저장한 데이터들을 넣어 계산된 각도를 인스턴스의 result에 넣기
        calculateTensor.getAngles(poseArray, rightArray, leftArray);

        // 인스턴스에 저장된 각도 불러오기
        const angles = calculateTensor.getResults();

        const aimodel = AiResult.getInstance();

        seq.push(angles);
        if (seq.length > 14) {
          seq.shift();
          aimodel.aiCalculate(seq, model);
        }

        const aiResult = aimodel.getResults();

        finResultList.push(resultList[aiResult]);

        // 쌓인 결과가 60개 초과하면 판단 시작
        const framerate = 40;
        if (finResultList.length > framerate) {
          // 오래된 인자 제거
          finResultList.shift();

          // 비교 문자와 일치하는 개수
          const findMostElement = (arr: string[]) => {
            if (arr.length === 0) return null;

            let elementMap: { [key: string]: number } = {};
            let maxCount = 0;
            let maxCountElement = arr[0];

            arr.forEach((element) => {
              if (elementMap[element]) {
                elementMap[element]++;
              } else {
                elementMap[element] = 1;
              }

              if (elementMap[element] > maxCount) {
                maxCount = elementMap[element];
                maxCountElement = element;
              }
            });

            return { element: maxCountElement, count: maxCount };
          };

          // 결과 리스트 중 가장 많이 나온 인자 find

          let result: findMostElementResult | null = findMostElement(finResultList);

          // 만약 가장 많이 나온 인자가 48개 이상이면(80%이상)
          if (result!.count > framerate * 0.8) {
            // 정답을 인자로 변경
            answer = result!.element;
            setSubmitWord(answer);
          }
          // 아니면 초기화
          else {
            answer = "";
          }
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
            width: 200,
            height: 180,
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
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <video
        ref={videoRef}
        loop={true}
        muted={true}
        autoPlay={true}
        playsInline={true}
        style={{ transform: "rotateY(180deg)" }}
      ></video>
      {videoSize && (
        <>
          <AvatarCanvas
            width={videoSize.width}
            height={videoSize.height}
            url={modelUrl}
            avatar_name={avatar.avatar}
          />
          {ishidden && (
            <>
              <PoseLandmarkerCanvas width={videoSize.width} height={videoSize.height} />
              <HandLandmarkerCanvas width={videoSize.width} height={videoSize.height} />
            </>
          )}
        </>
      )}

      {/* 추가 버튼 및 input 칸 */}
      <div
        style={{
          position: "absolute",
          right: "-30px",
        }}
      >
        <button
          onClick={clickButton}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            fontFamily: "TTHakgyoansimJiugaeR",
            fontSize: "15px",
            lineHeight: "15px",
            backgroundColor: ishidden ? "rgb(255, 157, 157)" : "rgb(182, 202, 255)",
          }}
        >
          골격
          <br />
          {ishidden ? "숨기기" : "보기"}
        </button>
      </div>
    </div>
  );
};

export default LandmarkerCanvas;
