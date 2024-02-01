import cv2
import os
import json
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import load_model


test_data_version = "v1.1.4"

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
        'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
        'ㅈㅈㅈㅈㅈㅈㅈㅈㅈ','ㅈㅈㅈㅈㅈㅈㅈㅈㅈ',
        'ㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊ','ㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊ',
        'ㅋㅋ', 'ㅋㅋ',
        'ㅌㅌㅌㅌㅌㅌ', 'ㅌㅌㅌㅌㅌㅌ',
        'ㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍ', 'ㅍㅍㅍㅍㅍㅍㅍ',
        'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ', 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ']

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
        
        # img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
        
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
            
        
            if results.pose_landmarks:
                
                # 필요 keypoint만 저장
                # 빈 벡터 생성
                joint_p = np.zeros((14, 2))
                
                # 빈 벡터에 필요 keypoint 저장(11~ 24)
                i = 0
                for j, lm in enumerate(results.pose_landmarks.landmark):
                    if j in list(range(11, 25)):
                        joint_p[i] = [lm.x, lm.y]
                        i += 1  
                
                # 기준벡터 및 필요 벡터 추출
                v1_p = joint_p[[0, 2, 3, 4, 5, 0, 0, 1, 1, 12, 12, 13, 13], :]
                v2_p = joint_p[[1, 0, 1, 2, 3, 1, 12, 0, 13, 0, 13, 1, 12], :]
                
                v_p = v2_p - v1_p
                
                # 벡터 정규화(크기 1)
                v_p = v_p/np.linalg.norm(v_p, axis=1)[:, np.newaxis]
                
                # 기준벡터 설정
                strd_v = np.zeros((3, 2))
                strd_v[0] = v_p[0]
                
                strd_v[1] = v_p[6]
                strd_v[2] = v_p[8]
                
                
                # strd_v -> 기준벡터 2*1짜리 2개
                
                
                # ==========================오른손 + 오른팔 각도 벡터=============================
                # 오른손 존재 시
                if results.right_hand_landmarks:
                    
                    # 빈벡터 준비 및 데이터 삽입
                    joint_r_h = np.zeros((21, 2))
                    for j, lm in enumerate(results.right_hand_landmarks.landmark):
                        joint_r_h[j] = [lm.x, lm.y]
                    
                    # 손가락 벡터
                    v1_r_h = joint_r_h[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 0, 0, 5], :]
                    v2_r_h = joint_r_h[[2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 5, 17, 17], :]
                    v_r_h = v2_r_h - v1_r_h
                    
                    # 정규화
                    v_r_h = v_r_h /np.linalg.norm(v_r_h, axis=1)[:, np.newaxis]
                    
                    # 팔 벡터 병합
                    v_r = np.concatenate([v_r_h, v_p[[1, 3], :]])
                    # 20 * 2 벡터
                    
                    # 각도 계산
                    d_right = np.arccos(np.einsum('nt,nt->n', 
                                strd_v[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], :], 
                                v_r[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], :]
                                ))
                    d_right = np.degrees(d_right)
                    # d_right => 40 * 1 벡터
                    
                # 만약 오른손 없으면
                else:
                    d_right = np.zeros((40, ))
                
                
                # ==========================왼손 + 왼팔 각도 벡터=============================
                # 왼손 존재 시
                if results.left_hand_landmarks:
                    
                    # 빈벡터 준비 및 데이터 삽입
                    joint_l_h = np.zeros((21, 2))
                    for j, lm in enumerate(results.left_hand_landmarks.landmark):
                        joint_l_h[j] = [lm.x, lm.y]
                    
                    # 손가락 벡터
                    v1_l_h = joint_l_h[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 0, 0, 5], :]
                    v2_l_h = joint_l_h[[2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 5, 17, 17], :]
                    v_l_h = v2_l_h - v1_l_h
                    
                    # 정규화
                    v_l_h = v_l_h /np.linalg.norm(v_l_h, axis=1)[:, np.newaxis]
                    
                    # 팔 벡터 병합
                    v_l = np.concatenate([v_l_h, v_p[[2, 4], :]])
                    # 20 * 2 벡터
                    
                    # 각도 계산
                    d_left = np.arccos(np.einsum('nt,nt->n', 
                                strd_v[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], :], 
                                v_l[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], :]
                                ))
                    d_left = np.degrees(d_left)
                    # d_left => 40 * 1 벡터
                    
                # 만약 왼손 없으면
                else:
                    d_left = np.zeros((40, ))
                    
                    
                # =============몸통 : 몸의 회전정도 판단===========
                d_body_i = np.arccos(np.einsum('nt,nt->n', 
                                v_p[[5, 7, 9, 11], :], 
                                v_p[[6, 8, 10, 12], :]
                                ))
                
                d_body_i = np.degrees(d_body_i)
                
                # 상 하 합산을 통해 사다리꼴의 비틀림 정도를 판단
                d_body = np.zeros((2, ))
                # d_body[0] = d_body_i[0] + d_body_i[3]
                # d_body[1] = d_body_i[1] + d_body_i[2]
                
                
                
                # 전부 합산
                d = np.concatenate([d_right, d_left, d_body])
                # d => right : 40 * 1, left : 40 * 1, body : 2 * 1. label : 1 * 1 => 83
                
                data.append(d)
                
            # 포즈 인식이 안될 경우
            else:
                dummy_data = np.zeros((82, ))
                data.append(dummy_data)
            


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
                print('못찾음!')
                continue
            
            print(move[i_pred])

            action = actions[i_pred]

            # cv2.putText(img, f'{this_action.upper()}', org=(int(res.landmark[0].x * img.shape[1]), int(res.landmark[0].y * img.shape[0] + 20)), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(255, 255, 255), thickness=2)

    # out.write(img0)
    # out2.write(img)
            cv2.imshow('img', img)
            if cv2.waitKey(1) == ord('q'):
                break