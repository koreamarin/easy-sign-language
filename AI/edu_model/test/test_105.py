import cv2
import os
import json
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import load_model


test_data_version = "v1.0.5"

path = os.path.dirname(os.path.abspath(__file__))

with open(f'{path}/../create_dataset/{test_data_version}/label.json', 'r', encoding='utf-8') as file:
    label = json.load(file)
    
word_count = label['label_count']
word_dict = label['label']

test_data_version = test_data_version.replace('.', '')[1:]

actions = list(range(word_count * 2 - 1))
seq_length = 10
move = ['default', 
        '기억! 기억! 기억! 기억!', '기억! 기억! 기억! 기억!', 
        'ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ', 'ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ',
        'ㄷㄷㄷㄷㄷ디귿ㄷㄷㄷㄷㄷ디귿ㄷㄷㄷ', 'ㄷㄷㄷㄷㄷ디귿ㄷㄷㄷㄷㄷ디귿ㄷㄷㄷ',
        'ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ', 'ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ',
        'ㅁㅁㅁㅁ', 'ㅁㅁㅁㅁ',
        'ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ', 'ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ',
        'ㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅ', 'ㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅ',
        'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',]

print(test_data_version)
model = load_model(f'{path}/data_{test_data_version}_train_100_model.h5')

# MediaPipe hands model
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic

with mp_holistic.Holistic(
  static_image_mode = False,
  
  # 실제 모델 돌릴 때 올리기
  model_complexity = 2,
  enable_segmentation = True,
  refine_face_landmarks = False,
  min_detection_confidence = 0.5,
  min_tracking_confidence = 0.5
) as holistic:

    
    # 비디오 파일 열기
    cap = cv2.VideoCapture(0)
    data = []
    while cap.isOpened():
        
        ret, img = cap.read()
        
        if ret:
            img.flags.writeable = False
                
            # 프레임 벡터 -> RGB 변경
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            
            # RGB로 변경된 프레임을 mediapipe로 인식
            results = holistic.process(img)
            
            # 프레임 수정 가능으로 변경
            img.flags.writeable = True
            
            # 프레임 RGB -> 벡터 변경
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            
        
            if results.pose_landmarks and results.left_hand_landmarks and results.right_hand_landmarks:

                # 빈 벡터 생성
                joint_p = np.zeros((14, 2))
                
                # 필요 keypoint만 저장하기 위한 알고리즘 -> 기존 pose는 33개의 keypoint
                i = 0
                for j, lm in enumerate(results.pose_landmarks.landmark):
                    if j in list(range(11, 25)):
                        joint_p[i] = [lm.x, lm.y]
                        i += 1  
                        
                v1_p = joint_p[[0, 0, 1, 12], :]
                v2_p = joint_p[[1, 12, 0, 0], :]
                v_p = v2_p - v1_p    
            
                        
                joint_l = np.zeros((21, 2))
                for j, lm in enumerate(results.left_hand_landmarks.landmark):
                    joint_l[j] = [lm.x, lm.y]
                    
                v1_p = joint_p[[0, 0, 1, 13], :]
                v2_p = joint_p[[1, 12, 0, 1], :]
                v_p = v2_p - v1_p    
            
                        
                joint_l = np.zeros((21, 2))
                for j, lm in enumerate(results.left_hand_landmarks.landmark):
                    joint_l[j] = [lm.x, lm.y]
                    
                v1_l = joint_l[[0, 0, 5], :]
                v2_l = joint_l[[5, 17, 17], :]
                v_l = v2_l - v1_l  
                    
                
                joint_r = np.zeros((21, 2))
                for j, lm in enumerate(results.right_hand_landmarks.landmark):
                    joint_r[j] = [lm.x, lm.y]
                    
                v1_r = joint_r[[0, 0, 5], :]
                v2_r = joint_r[[5, 17, 17], :]
                v_r = v2_r - v1_r  
                
                v_p = v_p /np.linalg.norm(v_p, axis=1)[:, np.newaxis]
                v_r = v_r /np.linalg.norm(v_r, axis=1)[:, np.newaxis]
                v_l = v_l /np.linalg.norm(v_l, axis=1)[:, np.newaxis]
                
                
                angle_p1 = np.arccos(np.einsum('nt,nt->n',
                        v_p[[0, 0, 0, 1, 1, 1], :],
                        v_l[[0, 1, 2, 0, 1, 2], :]))
                

                angle_p2 = np.arccos(np.einsum('nt,nt->n',
                        v_p[[2, 2, 2, 3, 3, 3], :],
                        v_r[[0, 1, 2, 0, 1, 2], :]))
                
                angle_p1 = np.degrees(angle_p1)
                angle_p2 = np.degrees(angle_p2)
                
                angle_p = np.concatenate([angle_p1, angle_p2])
            

                d_pose = np.concatenate([angle_p])
                
            else:
                d_pose = np.zeros((12,))

            
            # ==========================================================================
            # ==========================================================================
            
            # # 왼손
            # 순간적으로 왼손이 안보일 때를 고려해서 NaN배열을 넣어줘야함
            # 왼손이 존재할때
            if results.left_hand_landmarks is not None:
                # print('왼손존재')
                joint_l = np.zeros((21, 2))
                for j, lm in enumerate(results.left_hand_landmarks.landmark):
                    joint_l[j] = [lm.x, lm.y]
                
                v1_l = joint_l[[0, 5, 0, 0, 0, 0, 0], :]
                v2_l = joint_l[[17, 17, 4, 8, 12, 16, 20], :]
                v_l = v2_l - v1_l
                
                v_l = v_l /np.linalg.norm(v_l, axis=1)[:, np.newaxis]

                angle_l = np.arccos(np.einsum('nt,nt->n',
                    v_l[[0, 0, 0, 0, 0, 1, 1, 1, 1, 1],:], 
                    v_l[[2, 3, 4, 5, 6, 2, 3, 4, 5, 6],:]))
                
                # 계산 결과 : 15 * 1
                angle_l = np.degrees(angle_l)
                # 이미 pose에서 라벨링을 했으므로 따로 X
                
                # 15 * 1 벡터(angle_label -> 15 * 1)
                d_left = np.concatenate([angle_l])

            # 왼손이 존재하지 않을 때
            else:
                d_left = np.zeros((10,))

            # ==========================================================================
            # ==========================================================================



            # # 오른손
            # 순간적으로 오른손이 안보일 때를 고려해서 NaN배열을 넣어줘야함
            # 오른손이 존재할때
            if results.right_hand_landmarks is not None:
                joint_r = np.zeros((21, 2))
                
                for j, lm in enumerate(results.right_hand_landmarks.landmark):
                    joint_r[j] = [lm.x, lm.y]
                
                v1_r = joint_r[[0, 5, 0, 0, 0, 0, 0], :]
                v2_r = joint_r[[17, 17, 4, 8, 12, 16, 20], :]
                v_r = v2_r - v1_r
                
                v_r = v_r /np.linalg.norm(v_r, axis=1)[:, np.newaxis]

                angle_r = np.arccos(np.einsum('nt,nt->n',
                    v_r[[0, 0, 0, 0, 0, 1, 1, 1, 1, 1],:], 
                    v_r[[2, 3, 4, 5, 6, 2, 3, 4, 5, 6],:]))
                
                # 계산 결과 : 15 * 1
                angle_r = np.degrees(angle_r)
                # 이미 pose에서 라벨링을 했으므로 따로 X
                
                # 15 * 1 벡터(angle_rabel -> 15 * 1)
                d_right = np.concatenate([angle_r])


            # 오른손이 존재하지 않을 때
            else:
                d_right = np.zeros((10,))

            # ==========================================================================
            # ==========================================================================
            
            # # 병합
            
            # d_pose 마지막에 라벨링이 존재하므로 pose를 마지막에 붙여줌
            # d_left : 15 * 1, d_right : 15 * 1, d_pose : 12 * 1 => 42 * 1
            d = np.concatenate([d_left, d_right, d_pose])
            # d = np.concatenate([d_pose])

            # print(np.shape(d))
            data.append(d)
            if len(data) > seq_length:
                data.pop(0)
            # print(len(data))
            if len(data) < seq_length:
                continue
            # print(len(data))
            
            mp_drawing.draw_landmarks(
                    # 이미지에 적용
                img,
                # mediapipe의 결과 중 포즈를 적용
                results.pose_landmarks,
                # mediapipe에서 나온 keypoint들끼리 연결시켜준 선을 표시
                mp_holistic.POSE_CONNECTIONS,
                # 키포인트 css? style?을 앞서 설정한 것으로 설정
                landmark_drawing_spec=mp_drawing_styles
                .get_default_pose_landmarks_style())
            # 왼손
            mp_drawing.draw_landmarks(
                img,
                results.left_hand_landmarks,
                mp_holistic.HAND_CONNECTIONS,
                landmark_drawing_spec=mp_drawing_styles
                .get_default_hand_landmarks_style())
            # 오른손
            mp_drawing.draw_landmarks(
                img,
                results.right_hand_landmarks,
                mp_holistic.HAND_CONNECTIONS,
                landmark_drawing_spec=mp_drawing_styles
                    .get_default_hand_landmarks_style())
  


            input_data = np.expand_dims(np.array(data, dtype=np.float32), axis=0)

            # print(model.predict(input_data))
            
            y_pred = model.predict(input_data).squeeze()

            i_pred = int(np.argmax(y_pred))
            conf = y_pred[i_pred]

            if conf < 0.5:
                print('못찾음!', model.predict(input_data))
                continue
            
            print(move[i_pred])

            action = actions[i_pred]

            # cv2.putText(img, f'{this_action.upper()}', org=(int(res.landmark[0].x * img.shape[1]), int(res.landmark[0].y * img.shape[0] + 20)), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(255, 255, 255), thickness=2)

    # out.write(img0)
    # out2.write(img)
            cv2.imshow('img', img)
            if cv2.waitKey(1) == ord('q'):
                break