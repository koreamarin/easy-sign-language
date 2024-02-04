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
    getAngles = (poseData: Array<object> | [], rightHandData: Array<object> | [], leftHandData: Array<object> | []) => {
        
        // 각도 저장 공간(80*1 배열)
        let degrees: tf.Tensor = tf.zeros([80])

        // 오른쪽 각도 저장 공간(40*1배열)
        let rightDegrees: tf.Tensor = tf.zeros([40])
        // 왼쪽 각도 저장 공간(40*1배열)
        let leftDegrees: tf.Tensor = tf.zeros([40])

        
        // 만약 pose가 비어있으면 => 제로텐서 반환
        if (!poseData.length) {
            degrees = tf.zeros([80])
        } 
        else {
            // 만약 pose가 존재하면(타입스크립트의 특성 상 우선적으로 타입을 명시해줘야 에러X)
            if (poseData.length) {

                // poseData에서 x, y 값을 뽑아 poseArray에 저장시켜줌, 즉 poseArray는 pose 랜드마크 개수인 33개 중 x, y만 뽑아서
                // 2차원 배열로 만들어짐 -> (33 * 2)
                const poseArray = poseData.map(point => {if ("x" in point && "y" in point) {
                    return [point.x, point.y]
                } else {
                    throw new Error('x, y가 없음')
                }
            }) as number[][]

            // 생성한 array를 텐서플로우의 2차원 텐서로 형성
            const poseLocateTensor = tf.tensor2d(poseArray)

            // 필요한 상대 텐서를 구하기 위해 빼줄 좌표 텐서들을 묶어줌 -> 필요 상대 백터 수 : 7개 (개당 2개의 좌표백터 필요)
            const poseIdxSubtractForRelateTensor = [[11, 12], [12, 24], [11, 23], [12, 14], [14, 16], [11, 13], [13, 15]]
            
            // 구한 상대 텐서를 넣어줄 빈 array, 추후 array 또한 텐서플로우의 텐서로 변환
            const poseRelateTensorProcess: tf.Tensor[] = [];

            
            // 묶어준 좌표텐서들을 for문을 돌리면서 빼준 후 빈 array에 넣어줌
            for (const [initIdx, nextIdx] of poseIdxSubtractForRelateTensor) {
                poseRelateTensorProcess.push(tf.sub(poseLocateTensor.gather([nextIdx]), poseLocateTensor.gather([initIdx])))
            }
            
            // 상대텐서들이 들어있는 array를 텐서로 변환(7 * 2)
            const poseRelateTensor = tf.concat(poseRelateTensorProcess)


            // 해당 텐서들을 크기가 1로 정규화 시켜줌
            // 나눠주기 위한 텐서 계산
            // norm 인자 -> (계산 목표 텐서, 유클리드 노름(2 => 2차원 공간), axis, 입력텐서 차원 동일 여부)
            const poseNormProcess = tf.norm(poseRelateTensor, 2, 1, true)

            // 계산값을 나눠줌으로써 정규화 텐서 생성(7 * 2)
            const poseRelateTensorNorm = tf.div(poseRelateTensor, poseNormProcess)
            

            

            // =======================================오른쪽=================================
            if (rightHandData.length) {

                // (21 * 2)
                const rightArray = rightHandData.map(point => {if ("x" in point && "y" in point) {
                    return [point.x, point.y];
                } else {
                    throw new Error("x, y가 없음");
                }
            }) as number[][]


            const rightHandLocateTensor = tf.tensor2d(rightArray)

            const rightHandIdxSubtractForRelateTensor = [[1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [9, 10], [10, 11], [11, 12], [13, 14], 
                                                        [14, 15], [15, 16], [17, 18], [18, 19], [19, 20], [0, 5], [0, 17], [5, 17]]

            const rightHandRelateTensorProcess: tf.Tensor[] = [];
            for (const [initIdx, nextIdx] of rightHandIdxSubtractForRelateTensor) {
                rightHandRelateTensorProcess.push(tf.sub(rightHandLocateTensor.gather([nextIdx]), rightHandLocateTensor.gather([initIdx])))
            }
            
            // 상대텐서들이 들어있는 array를 텐서로 변환(18 * 2)
            const rightHandRelateTensor = tf.concat(rightHandRelateTensorProcess)

            // 정규화
            const rightNormProcess = tf.norm(rightHandRelateTensor, 2, 1, true)
            const rightHandRelateTensorNorm = tf.div(rightHandRelateTensor, rightNormProcess)

            // 내적할 텐서 준비
            // pose 텐서에서 팔 요소 가져오기
            const rightPoseInnerTensor = tf.gather(poseRelateTensorNorm, [5, 6])

            // 오른손 텐서와 오른팔 텐서를 합쳐 내적을 위한 새로운 텐서 생성((18 * 2) + (2 * 2) + (18 * 2) + (2 * 2) => (40 * 2))
            const rightTensorForInner = tf.concat([rightHandRelateTensorNorm, rightPoseInnerTensor, rightHandRelateTensorNorm, rightPoseInnerTensor], 0)

            // 내적을 위한 기준pose텐서 생성(40 * 2)
            const rightPoseTensorForInner = tf.gather(poseRelateTensorNorm, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                                                        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
            
            // 내적 결과 저장을 위한 array
            const rightInnerArray: tf.Tensor[] = []

            // 내적 결과를 arcos후 degrees로 바꾼 후 위 array에 밀어 넣기
            for (let i = 0; i < 40; i++) {
                rightInnerArray.push(tf.acos(tf.matMul(tf.gather(rightTensorForInner, [i]), tf.transpose(tf.gather(rightPoseTensorForInner, [i]))).mul(tf.scalar(180 / Math.PI))))
            }

            // 해당 결과를 텐서로 바꾼 후 rightDegrees에 밀어넣기(40 * 1)
            rightDegrees = tf.squeeze(tf.concat(rightInnerArray))

            }
            else {
                // 만약 오른손 데이터 없으면 오른쪽 데이터 전부 0으로
                rightDegrees = tf.zeros([40])
            }

            // =======================================왼쪽=================================
            if (leftHandData.length) {

                // (21 * 2)
                const rightArray = leftHandData.map(point => {if ("x" in point && "y" in point) {
                    return [point.x, point.y];
                } else {
                    throw new Error("x, y가 없음");
                }
            }) as number[][]


            const leftHandLocateTensor = tf.tensor2d(rightArray)

            const leftHandIdxSubtractForRelateTensor = [[1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [9, 10], [10, 11], [11, 12], [13, 14], 
                                                        [14, 15], [15, 16], [17, 18], [18, 19], [19, 20], [0, 5], [0, 17], [5, 17]]

            const leftHandRelateTensorProcess: tf.Tensor[] = [];
            for (const [initIdx, nextIdx] of leftHandIdxSubtractForRelateTensor) {
                leftHandRelateTensorProcess.push(tf.sub(leftHandLocateTensor.gather([nextIdx]), leftHandLocateTensor.gather([initIdx])))
            }

            // (18 * 2)
            const leftHandRelateTensor = tf.concat(leftHandRelateTensorProcess)

            const leftNormProcess = tf.norm(leftHandRelateTensor, 2, 1, true)
            const leftHandRelateTensorNorm = tf.div(leftHandRelateTensor, leftNormProcess)

            const leftPoseInnerTensor = tf.gather(poseRelateTensorNorm, [3, 4])

            // (40 * 2)
            const leftTensorForInner = tf.concat([leftHandRelateTensorNorm, leftPoseInnerTensor, leftHandRelateTensorNorm, leftPoseInnerTensor], 0)

            // (40 * 2)
            const leftPoseTensorForInner = tf.gather(poseRelateTensorNorm, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                                                            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
            const leftInnerArray: tf.Tensor[] = []

            for (let i = 0; i < 40; i++) {
                leftInnerArray.push(tf.acos(tf.matMul(tf.gather(leftTensorForInner, [i]), tf.transpose(tf.gather(leftPoseTensorForInner, [i]))).mul(tf.scalar(180 / Math.PI))))
            }

            // (40 * 1)
            leftDegrees = tf.squeeze(tf.concat(leftInnerArray))

            }
            else {
                leftDegrees = tf.zeros([40])
            }
            
        }

        // degrees에 rightDegrees, leftDegrees를 합쳐줌, 만약 아무것도 존재하지않으면(typescript 특성 상 추가)
        // 40 * 1 zeros를 넣어 추가
        degrees = tf.concat([rightDegrees || tf.zeros([40]), leftDegrees || tf.zeros([40])]);
        }

        // 클래스 인스턴스의 results에 텐서 저장(80 * 1)
        this.results = degrees

    }
}

export default CalculateTensor