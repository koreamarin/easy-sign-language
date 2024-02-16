import { 
    PoseLandmarker,
    FilesetResolver,
    PoseLandmarkerResult,
    DrawingUtils
 } from "@mediapipe/tasks-vision";
 


//  포즈 랜드마크에 대한 클래스 지정
class PoseLandmarkerManager {

    // 해당 클래스가 지정되어야지만 인스턴스를 만들수 있음(private)
    private static instance : PoseLandmarkerManager = new PoseLandmarkerManager();

    // 해당 클래스가 지정되어야지만 results를 가져올 수 있음
    private results !: PoseLandmarkerResult

    // PoseLandmarker의 인스턴스 poseLandmarker
    poseLandmarker !: PoseLandmarker | null

    private constructor() {
        this.initializeModel();
    }

    static getInstance() : PoseLandmarkerManager {
        return PoseLandmarkerManager.instance
    }

    // 초기 모델 설정
    initializeModel = async () => {

        // PoseLandmarker 인스턴스 초기화
        this.poseLandmarker = null

        // 미디어파이프 리졸버 불러온후 filesetResolver에 저장
        const filesetResolver = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        )

        // PoseLandmarker 인스턴스인 poseLandmarker의 옵션 설정
        this.poseLandmarker = await PoseLandmarker.createFromOptions(

            // 리졸버 설정
            filesetResolver,
            {
                // 기존 옵션 설정
                baseOptions : {

                    // 모델 에셋(최신버전 - full모델)
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task`,
                    
                    // GPU로 이용
                    delegate: "GPU",
                },

                // 일부분의 포즈가 나와도 허용할건지?
                outputSegmentationMasks: true,

                // 비디오 element와 연동
                runningMode: "VIDEO",

                // 탐지할 pose의 최대 수(1명만 감지하도록)
                numPoses: 1
            }
        )
    }

    // 해당 클래스에서 results값 반환 함수
    getResults = () => {
        return  this.results
    }

    // 비디오에서 landmarks 탐지 및 결과에 저장
    detectLandmarks = (videoElement:HTMLVideoElement, time: number) => {
        // 만약 PoseLandmarker의 인스턴스인 poseLandmarker가 비어있으면 함수 종료
        if (!this.poseLandmarker) return

        // results 변수에 비디오tag에서 가져온 프레임에서의 landmarks 결과값 저장
        const results = this.poseLandmarker.detectForVideo(videoElement, time)

        // 클래스 인스턴스의 results에 landmarks 값 저장
        this.results = results

        // 결과값 반환
        return results
    }

    // 비디오 위에 랜드마크 그린 후 씌우기
    drawLandmarks = (canvas: HTMLCanvasElement) => {
        
        // canvas의 인스턴스인 ctx에서 툴중 2d 그래픽 담당 불러오기
        const ctx = canvas.getContext("2d")

        // 만약 툴이 감지되지 않거나 mediapipe의 결과 중에 랜드마크가 없으면 함수 종료
        if (!ctx || !this.results?.landmarks) return

        // 칸버스 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // 미디어파이프의 그림 툴 인스턴스 생성
        const drawingUtils = new DrawingUtils(ctx)

        // 그려지는 선의 너비
        const lineWidth = 2;

        // 랜드마크 연결 선
        for (const landmark of this.results.landmarks) {
            // drawingUtils.drawLandmarks(
            //     landmark,
            //     { color: "#FFFFFF", lineWidth: lineWidth }
            //     );
            drawingUtils.drawConnectors(
                landmark,
                PoseLandmarker.POSE_CONNECTIONS,
                { color: "#FFFFFF", lineWidth: lineWidth }
            )
            }
    }
}

export default PoseLandmarkerManager