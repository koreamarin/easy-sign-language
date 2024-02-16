import { useEffect, useRef, useState } from "react";
import PoseLandmarkerCanvas from "./Pose";
import PoseLandmarkerManager from "../../poseModelLogic/PoseLandmarkManager";
import HandLandmarkerCanvas from "./Hand";
import HandLandmarkerManager from "../../poseModelLogic/HandLandmarkManager";
import CalculateTensor from "../../poseModelLogic/CalculateVector";
import AiResult from "../../poseModelLogic/AiModel";
import AvatarCanvas from "../Sonagi/AvatarCanvas";
import FaceLandmarkManager from "../common/FaceLandmarkManager";
import * as tf from "@tensorflow/tfjs";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/modules";

const LectureLandmarkerCanvas = ({
  finResult,
  setSecond,
  ishidden,
  stopComp,
  currentWord,
  successModal,
  failModal,
  sethidden,
  category,
  gubun,
}) => {
  // mediapipe 얼굴 매쉬 인식을 위한 클래스
  const faceLandmarkManager = FaceLandmarkManager.getInstance();

  const model = tf.loadLayersModel(
    process.env.PUBLIC_URL + "/model/" + gubun + "/" + category + "/model.json"
  );

  // 얼굴에 씌울 아바타 이름
  // Bear, Cat, Chicken, Deer, Dog, Elephant, Pig, Rabbit
  const avatar = useSelector((state: rootState) => state.avatar);

  // avatar 모델 파일 불러오기
  const modelUrl = process.env.PUBLIC_URL + "/assets/mask/animal_face_pack.gltf";

  // element에서 비디오 값을 가져와 저장
  const videoRef = useRef<HTMLVideoElement>(null);

  // const seq = useRef<object[]>([]);
  const seq: number[][] = [];

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

  const modelWordList = {
    자음: [
      "대기중...",
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
    ],
    모음: [
      "대기중...",
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
      "ㅐ",
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
    ],
    숫자: [
      "대기중...",
      "0",
      "0",
      "1",
      "1",
      "2",
      "2",
      "3",
      "3",
      "4",
      "4",
      "5",
      "5",
      "6",
      "6",
      "7",
      "7",
      "8",
      "8",
      "9",
      "9",
    ],
    동물: [
      "대기중...",
      "강아지_i",
      "강아지",
      "강아지_f",
      "고양이_i_f",
      "고양이",
      "사자_i",
      "사자",
      "사자_f",
      "소",
      "코끼리",
    ],
    과일: [
      "대기중...",
      "레몬_i_f",
      "레몬",
      "바나나_i",
      "바나나",
      "바나나_f",
      "수박_i_f",
      "수박",
      "포도_i_f",
      "포도",
      "호두_i",
      "호두",
      "호두_f",
    ],
  };

  const resultWordsList = {
    자음: [],
    모음: [],
    숫자: [],
    동물: ["강아지", "고양이", "사자", "소", "코끼리"],
    과일: ["레몬", "바나나", "수박", "포도", "호두"],
  };

  const wordList = resultWordsList[category];

  const resultList = modelWordList[category];

  // 판단부분 => stopComp가 true가 되면 판단 완료
  // 이후 해당 정보 상위 컴포넌트로 올리기
  // finResult => false : 틀림
  // finResult => true : 맞음

  const finResultList: string[] = [];

  let hookForTimer: boolean = false;

  // porps로 받아오기
  const compareWord: string = currentWord;

  let startTime: number;

  //
  const animate = () => {
    if (stopComp.current) {
      setSecond(0);
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

        const dynamicWord = (init: string, middle: string, finish: string) => {
          let initMiddleIdx = 0;
          let finMiddleIdx = 0;
          // 인식 결과 리스트 0이 인식되었을 때 5개 묶음 리스트가 for문을 돌아가면서 60%를 확인해야됨,
          // 60%가 끝났을 때 인덱스가 걸려야됨

          // 시작점 찾기!
          if (finResultList[0] === init) {
            for (let i = 0; i < 50; i++) {
              let countInit = 0;

              // 인덱스 범위안에서 강아지_i 갯수 찾아서 7개 이상이면 돌리는식으로
              for (let j = i; j < i + 10; j++) {
                if (finResultList[j] === init) {
                  // 가운데 친구(일반 강아지)의 시작점 업데이트
                  initMiddleIdx = j + 1;
                  countInit += 1;
                }
              }

              if (countInit < 9) {
                // 만약 i가 한번밖에 안돔(0~9까지 안에 60%를 못넘겼을 때)
                if (!i) {
                  initMiddleIdx = 0;
                }
                break;
              }
            }
          }

          // 끝점 찾기!
          if (initMiddleIdx && initMiddleIdx < 49) {
            // initMiiddle부터 도는데 => 시작점이 바껴야 됨, 왜냐-> 끝에서 먹을수 있어서  ->  만약 60퍼가 넘으면 finMiddle에 훅 그리고 break

            for (let i = initMiddleIdx; i <= 50; i++) {
              let countFin = 0;
              // for문으로 위와 같게 해버림 대신 finMiddle은 나중에 찾는걸로
              for (let j = i; j < i + 10; j++) {
                if (finResultList[j] === finish) {
                  countFin += 1;
                }
              }
              // 만약 끝점 리스트 70% 이상을 하나라도 찾으면 나가버려야됨 finMiddle을 업데이트하면서
              if (countFin >= 7) {
                const findFinList = finResultList.slice(i, i + 3);
                finMiddleIdx = findFinList.indexOf(finish) + i;
                break;
              }
            }
          }

          if (initMiddleIdx && finMiddleIdx && initMiddleIdx + 7 < finMiddleIdx) {
            let countMiddle = 0;
            for (let i = initMiddleIdx; i < finMiddleIdx; i++) {
              if (finResultList[i] === middle) {
                countMiddle += 1;
              }
            }
            if (countMiddle / (finMiddleIdx - initMiddleIdx - 1) > 0.8) {
              finResult.current = true;
              stopComp.current = true;
            }
          }
        };

        // ===========================================================================
        const staticWord = () => {
          const checkArray = finResultList.filter((compare) => compare === compareWord);
          if (checkArray.length > 48) {
            finResult.current = true;
            stopComp.current = true;
          }
        };

        const aiResult = aimodel.getResults();

        finResultList.push(resultList[aiResult]);

        // 쌓인 결과가 60개 초과하면 판단 시작

        if (finResultList.length > 60) {
          // 오래된 인자 제거
          finResultList.shift();

          if (category === "동물") {
            if (wordList.indexOf(compareWord, 0) === 0) {
              dynamicWord("강아지_i", "강아지", "강아지_f");
            } else if (wordList.indexOf(compareWord, 0) === 1) {
              dynamicWord("고양이_i_f", "고양이", "고양이_i_f");
            } else if (wordList.indexOf(compareWord, 0) === 2) {
              dynamicWord("사자_i", "사자", "사자_f");
            } else if (wordList.indexOf(compareWord, 0) === 3) {
              staticWord();
            } else if (wordList.indexOf(compareWord, 0) === 4) {
              staticWord();
            }
          } else if (category === "과일") {
            if (wordList.indexOf(compareWord, 0) === 0) {
              dynamicWord("레몬_i_f", "레몬", "레몬_i_f");
            } else if (wordList.indexOf(compareWord, 0) === 1) {
              dynamicWord("바나나_i", "바나나", "바나나_f");
            } else if (wordList.indexOf(compareWord, 0) === 2) {
              dynamicWord("수박_i_f", "수박", "수박_i_f");
            } else if (wordList.indexOf(compareWord, 0) === 3) {
              dynamicWord("포도_i_f", "포도", "포도_i_f");
            } else if (wordList.indexOf(compareWord, 0) === 4) {
              dynamicWord("호두_i", "호두", "호두_f");
            }
          } else if (category === "자음" || category === "모음" || category === "숫자") {
            staticWord();
          }
        }

        if (!hookForTimer) {
          startTime = performance.now();
          hookForTimer = true;
        }

        setSecond(10 - Math.floor((performance.now() - startTime) / 1000));

        // 타이머, 10초 이상 실행될 시
        if (performance.now() - startTime > 10000) {
          // 컴포넌트 정지 및 오답처리(finResult의 default는 false)
          stopComp.current = true;
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
        <>{<AvatarCanvas width={533} height={510} url={modelUrl} avatar_name={avatar.avatar} />}</>
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

export default LectureLandmarkerCanvas;
