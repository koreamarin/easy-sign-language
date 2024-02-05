import * as tf from "@tensorflow/tfjs"


class AiResult {

    // 해당 클래스가 지정되어야지만 인스턴스를 만들수 있음(private)
    private static instance : AiResult = new AiResult();

    // 추후 결과 인덱스를 저장시켜줄 공간
    private results !: number


    // 클래스 생성시 객체 초기화 담당(initializeMode로 연결해 초기화 실시)
    private constructor() {
        this.initializeModel();
    }

    // 인스턴스 생성자
    static getInstance() : AiResult {
        return AiResult.instance
    }

    // 초기 모델
    initializeModel = () => {
        this.results = 0

    }

    // 해당 클래스에서 results값 반환 함수
    getResults = () => {
        return this.results
    }

    // 받은 랜드마커 좌표를 각도로 치환하여 저장시켜주는 함수
    aiCalculate = (seq: number[][]) => {
        const model = tf.loadLayersModel('../ai_model/model.json')
        const inputData = tf.tensor2d(seq, [1, 80])

    }
}

export default AiResult