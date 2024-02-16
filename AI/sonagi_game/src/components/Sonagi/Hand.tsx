import { useEffect, useRef } from "react";
import HandLandmarkerManager from "./class/HandLandmarkManager";


// 상위 컴포넌트부터 props 받아온 값으로 캔버스 크기 조절
interface HandLandmarkerCanvasProps {
  width: number;
  height: number;
}


const HandLandmarkerCanvas = ({ width, height }: HandLandmarkerCanvasProps) => {
  // 후 애니메이션의 프레임 number를 저장
  const requestRef = useRef(0)

  // 캔버스 내용 ref로 묶기
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)  

  // 
  const animate = () => {
    // 캔버스 내용이 존재 할 경우
    if (drawCanvasRef.current) {

      // 캔버스 사이즈 조절
      drawCanvasRef.current.width = width
      drawCanvasRef.current.height = height

      // 포즈 랜드마크에 대한 인스턴스 할당
      const handLandmarkerManager = HandLandmarkerManager.getInstance()

      // 비디오 위에 그린 랜드마크 씌우기
      handLandmarkerManager.drawLandmarks(drawCanvasRef.current)
    }

    // request변수에 시스템이 프레임을 그릴 준비가 완료되면 animate를 불러와 랜드마크 그리기
    // requestRef안에는 시작 후 프레임이 나옴
    requestRef.current = requestAnimationFrame(animate)
  }
  
  // 컴포넌트 마운트 될시
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)

    // 언마운트 되기 전에 실행, vue의 beforeUnmounted 훅과 유사
    // 언마운트 되기 전 저장되있던 예약된 프레임인 requestRef를 불러와 취소시킴
    return () => cancelAnimationFrame(requestRef.current)
  }, [])


  return (
    <canvas
    className="ab"
    style={{
      position: "absolute",
      width: width,
      height: height,
      transform: "scaleX(-1)"
    }}
    ref={drawCanvasRef}>
    </canvas>
  )
}

export default HandLandmarkerCanvas;