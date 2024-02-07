import * as tf from "@tensorflow/tfjs"
 

//  포즈-손 텐서를 각도로 치환
class CalculateTensor {

    // 해당 클래스가 지정되어야지만 인스턴스를 만들수 있음(private)
    private static instance : CalculateTensor = new CalculateTensor();

    // 추후 각도를 저장시켜줄 공간
    private results !: tf.Tensor


    // 클래스 생성시 객체 초기화 담당(initializeMode로 연결해 초기화 실시)
    private constructor() {
        this.initializeModel();
    }

    // 인스턴스 생성자
    static getInstance() : CalculateTensor {
        return CalculateTensor.instance
    }

    // 초기 모델
    initializeModel = () => {

        // rightHandLandmarker 인스턴스 초기화(0텐서로 80 * 1)
        this.results = tf.zeros([80])

    }

    // 해당 클래스에서 results값 반환 함수
    getResults = () => {
        return this.results
    }

    // 받은 랜드마커 좌표를 각도로 치환하여 저장시켜주는 함수
    getAngles = (poseData: object[] | [], rightHandData: object[] | [], leftHandData: object[] | []) => {

        // 0배열 함수
        const zeros = (len:number): number[] => {
            return Array(len).fill(0)
        }

        // 정규화 함수
        const norm = (elem:number[]): number[] => {
            const normElemt = Math.sqrt(elem.reduce((sum, val) => sum + val ** 2, 0));
            return elem.map(value => value / normElemt)
        }

        // 내적 후 degrees로 변환 함수
        const innerProduct = (innerElemt1:number[], innerElemt2:number[]) => {
            const innerProcessArray = innerElemt1.map((item, idx) => {
                return item * innerElemt2[idx]
            })
            const innerResult = innerProcessArray.reduce((init, next) => {
                return init + next})
            return Math.acos(innerResult) * 180 / Math.PI
        }

        let degrees: number[] = zeros(80)

        let rightDegrees: number[] = zeros(40)

        let leftDegrees: number[] = zeros(40)

        if (poseData.length) {
            const poseArray = poseData.map(point => {if ("x" in point && "y" in point) {
                return [point.x, point.y]
            } else {
                throw new Error('x, y가 없음')
            }
        }) as number[][]
        const poseIdx = [[11, 12], [12, 24], [11, 23], [12, 14], [14, 16], [11, 13], [13, 15]]
        const handIdx = [[1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [9, 10], [10, 11], [11, 12], [13, 14], 
                        [14, 15], [15, 16], [17, 18], [18, 19], [19, 20], [0, 5], [0, 17], [5, 17]]

        
        const poseRelate: number[][] = [];


        // (7 * 2)
        for (const[initIdx, nextIdx] of poseIdx) {
            poseRelate.push(norm(poseArray[nextIdx].map((item, idx) => item - poseArray[initIdx][idx])))
        }


        if (rightHandData.length) {
            const rightArray = rightHandData.map(point => {if ("x" in point && "y" in point) {
                return [point.x, point.y];
                } else {
                    throw new Error("x, y가 없음");
                }
            }) as number[][]

            const rightHandRelate: number[][] = []

            // (18 * 2)
            for (const[initIdx, nextIdx] of handIdx) {
                rightHandRelate.push(norm(rightArray[nextIdx].map((item, idx) => item - rightArray[initIdx][idx])))
            }

            
            // 내적할 리스트
            // pose에서 필요 요소 가져오기
            const needRightPoseIdx = [5, 6]
            // pose에서 필요 요소 리스트 생성
            const rightPoseNeed: number[][] = needRightPoseIdx.map((item) => poseRelate[item])
            
            // (40 * 2)
            const rightInnerArray: number[][] = ([] as number[][]).concat(rightHandRelate, rightPoseNeed, rightHandRelate, rightPoseNeed)


            const innerRightPoseIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

            // (40 * 2)
            const poseRightInnerArray:number[][] = innerRightPoseIdx.map((item) => poseRelate[item])

            rightDegrees = rightInnerArray.map((item, idx) => {
                return innerProduct(item, poseRightInnerArray[idx])
            })

        }


        // =====================왼쪽====================

        if (leftHandData.length) {
            const leftArray = leftHandData.map(point => {if ("x" in point && "y" in point) {
                return [point.x, point.y];
                } else {
                    throw new Error("x, y가 없음");
                }
            }) as number[][]

            const leftHandRelate: number[][] = []

            // (18 * 2)
            for (const[initIdx, nextIdx] of handIdx) {
                leftHandRelate.push(norm(leftArray[nextIdx].map((item, idx) => item - leftArray[initIdx][idx])))
            }

            
            // 내적할 리스트
            // pose에서 필요 요소 가져오기
            const needLeftPoseIdx = [3, 4]
            // pose에서 필요 요소 리스트 생성
            const leftPoseNeed: number[][] = needLeftPoseIdx.map((item) => poseRelate[item])
            
            // (40 * 2)
            const leftInnerArray: number[][] = ([] as number[][]).concat(leftHandRelate, leftPoseNeed, leftHandRelate, leftPoseNeed)


            const innerLeftPoseIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

            // (40 * 2)
            const poseLeftInnerArray:number[][] = innerLeftPoseIdx.map((item) => poseRelate[item])

            leftDegrees = leftInnerArray.map((item, idx) => {
                return innerProduct(item, poseLeftInnerArray[idx])
            })

        }
        degrees = rightDegrees.concat(leftDegrees)



        }

        this.results = tf.tensor(degrees)




    }
}

export default CalculateTensor