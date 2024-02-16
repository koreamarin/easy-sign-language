import * as tf from "@tensorflow/tfjs"
// import modelJson from "../ai_model/model.json"


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

    // 받은 인풋값을 모델로 인식
    aiCalculate = async (seq: number[][]) => {
        const model = await tf.loadLayersModel('https://cdn.jsdelivr.net/gh/bsh4766/JSmodel/jihwa/consonant/model.json')
        const inputData = tf.tensor3d(seq.flat(), [1, 10, 80])
        const output = model.predict(inputData) as tf.Tensor
        const preArray = output.dataSync()
        const resultArray = Array.from(preArray)
        const maxIdx: {maxValue: number, maxIndex: number} = resultArray.reduce((acc: {maxValue: number, maxIndex: number},cur: number,idx: number) => {
            if (cur > acc.maxValue) {
                acc.maxValue = cur
                acc.maxIndex = idx
            }
            return acc
        }, { maxValue: -Infinity, maxIndex: -1 })
        this.results = maxIdx.maxIndex
    }   
}

export default AiResult