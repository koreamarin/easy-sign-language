import mediapipe as mp
import cv2
import numpy as np
import json
import os


version = '1.1.4'

seq_length = 0

path = os.path.dirname(os.path.abspath(__file__))

# 저장되어있는 라벨(단어 수 및 단어(idx로 정렬시켜서)) 가져오기
with open(f'{path}/label.json', 'r', encoding='utf-8') as file:
    label = json.load(file)
    
word_count = label['label_count']
word_dict = label['label']

# 파일에서 비디오 - 라벨 연결 딕셔너리 제작
video_list = os.listdir(f'{path}/../../video')
video_json = dict()
for video in video_list:
    video_json[video] = video[:-4] + '_morpheme.json'
    
# 연결되어있는 json으로 판단 후 없으면 새로 만듬
for label_file in os.listdir(f'{path}/../../label'):
    with open(f'{path}/../../label/{label_file}', 'r', encoding='utf-8') as file:
        label_info = json.load(file)
    if label_info['data'][0]['attributes'][0]['name'] not in word_dict:
        word_dict[label_info['data'][0]['attributes'][0]['name']] = {'idx': word_count, 'file_cnt' : 0}
        word_count += 1
    # 시퀀스 길이 조절
    control_seq_len = label_info['data'][0]['seq_len']
    if seq_length < control_seq_len:
        seq_length = control_seq_len
seq_length = 10

# mediapipe의 holistic 내부 설정
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic
with mp_holistic.Holistic(
  static_image_mode = False,
  model_complexity = 2,
  enable_segmentation = True,
  refine_face_landmarks = False,
  min_detection_confidence = 0.5,
  min_tracking_confidence = 0.5
) as holistic:
    
  for video_file, json_file in video_json.items():
      
    # 정보 가져오기
    with open(f'{path}/../../label/{json_file}', 'r', encoding='utf-8') as file:
        label_data = json.load(file)
    start_point = label_data['data'][0]['start']
    end_point = label_data['data'][0]['end']
    label_name = label_data['data'][0]['attributes'][0]['name']
    
    file = f'{path}/../../video/{video_file}'
    
    
    # 비디오 파일 열기
    cap = cv2.VideoCapture(file)
    if cap.isOpened():
        
      # 프레임들의 데이터를 넣을 공간, 인자 한개당 프레임의 정보가 들어감
        data = []
        data_flip = []
        
        # 수어 시작점, -1은 보정값
        start_frame = int(start_point * cap.get(cv2.CAP_PROP_FPS)) - 1
        # print('시작프레임', start_frame)
        
        # 수어 끝점, +1은 보정값
        end_frame = int(end_point * cap.get(cv2.CAP_PROP_FPS)) + 1

        # 수어 시작점부터 데이터를 위한 영상 재생
        cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

        while True:
            
            # 만약 끝 프레임에 도달하면 종료 
            if cap.get(cv2.CAP_PROP_POS_FRAMES) > end_frame:
                break
            
            
            ret, img = cap.read()
            
            # 만약 영상이 재생될 수 있으면
            if ret:
                
                # 프레임 읽기전용으로 변경
                img.flags.writeable = False
                
                # 프레임 벡터 -> RGB 변경
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                
                # 데이터 영상 90도 회전
                img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
                
                # RGB로 변경된 프레임을 mediapipe로 인식
                results = holistic.process(img)
                
                
                # 데이터 추가 알고리즘
                
                # ==========================================================================
                # ==========================================================================
                
                # pose데이터 존재 시 시작, 없으면 전부 zeros로
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
                    
                    # 라벨 추가를 위한 빈공간 생성
                    d_body = np.array([d_body], dtype=np.float32)
                    
                    # 라벨 삽입
                    d_body = np.append(d_body, word_dict[label_name]['idx'] * 2)
                    
                    
                    # 전부 합산
                    d = np.concatenate([d_right, d_left, d_body])
                    # d => right : 40 * 1, left : 40 * 1, body : 2 * 1. label : 1 * 1 => 83
                    
                    data.append(d)
                    
                # 포즈 인식이 안될 경우
                else:
                    dummy_data = np.zeros((83, ))
                    dummy_data[82] = word_dict[label_name]['idx'] * 2
                    data.append(dummy_data)
                    
                    
                # =================================================================
                # ========================== 반전 데이터 ===========================
                # =================================================================
                
                # 좌우 반전
                img = cv2.flip(img, 1)
                
                # mediapipe 재구성
                results = holistic.process(img)


                if results.pose_landmarks:
                    joint_p = np.zeros((14, 2))

                    i = 0
                    for j, lm in enumerate(results.pose_landmarks.landmark):
                        if j in list(range(11, 25)):
                            joint_p[i] = [lm.x, lm.y]
                            i += 1  
                    
                    v1_p = joint_p[[0, 2, 3, 4, 5, 0, 0, 1, 1, 12, 12, 13, 13], :]
                    v2_p = joint_p[[1, 0, 1, 2, 3, 1, 12, 0, 13, 0, 13, 1, 12], :]
                    
                    v_p = v2_p - v1_p
                    
                    v_p = v_p/np.linalg.norm(v_p, axis=1)[:, np.newaxis]
                    
                    # 기준벡터 설정
                    strd_v = np.zeros((3, 2))
                    strd_v[0] = v_p[0]
                    
                    strd_v[1] = v_p[6]
                    strd_v[2] = v_p[8]
                    
                    
                    # ==========================오른손 + 오른팔 각도 벡터=============================
                    if results.right_hand_landmarks:

                        joint_r_h = np.zeros((21, 2))
                        for j, lm in enumerate(results.right_hand_landmarks.landmark):
                            joint_r_h[j] = [lm.x, lm.y]

                        v1_r_h = joint_r_h[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 0, 0, 5], :]
                        v2_r_h = joint_r_h[[2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 5, 17, 17], :]
                        v_r_h = v2_r_h - v1_r_h

                        v_r_h = v_r_h /np.linalg.norm(v_r_h, axis=1)[:, np.newaxis]

                        v_r = np.concatenate([v_r_h, v_p[[1, 3], :]])

                        d_right = np.arccos(np.einsum('nt,nt->n', 
                                    strd_v[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], :], 
                                    v_r[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], :]
                                    ))
                        d_right = np.degrees(d_right)
                    else:
                        d_right = np.zeros((40, ))
                    
                    
                    # ==========================왼손 + 왼팔 각도 벡터=============================
                    if results.left_hand_landmarks:

                        joint_l_h = np.zeros((21, 2))
                        for j, lm in enumerate(results.left_hand_landmarks.landmark):
                            joint_l_h[j] = [lm.x, lm.y]

                        v1_l_h = joint_l_h[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 0, 0, 5], :]
                        v2_l_h = joint_l_h[[2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 5, 17, 17], :]
                        v_l_h = v2_l_h - v1_l_h

                        v_l_h = v_l_h /np.linalg.norm(v_l_h, axis=1)[:, np.newaxis]

                        v_l = np.concatenate([v_l_h, v_p[[2, 4], :]])

                        d_left = np.arccos(np.einsum('nt,nt->n', 
                                    strd_v[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], :], 
                                    v_l[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], :]
                                    ))
                        d_left = np.degrees(d_left)
                    else:
                        d_left = np.zeros((40, ))

                        
                    # =============몸통 : 몸의 회전정도 판단===========
                    d_body_i = np.arccos(np.einsum('nt,nt->n', 
                                    v_p[[5, 7, 9, 11], :], 
                                    v_p[[6, 8, 10, 12], :]
                                    ))
                    
                    d_body_i = np.degrees(d_body_i)

                    d_body = np.zeros((2, ))
                    # d_body[0] = d_body_i[0] + d_body_i[3]
                    # d_body[1] = d_body_i[1] + d_body_i[2]

                    d_body = np.array([d_body], dtype=np.float32)

                    d_body = np.append(d_body, word_dict[label_name]['idx'] * 2 - 1)

                    d = np.concatenate([d_right, d_left, d_body])

                    data_flip.append(d)

                else:
                    dummy_data = np.zeros((83, ))
                    dummy_data[82] = word_dict[label_name]['idx'] * 2 - 1
                    data_flip.append(dummy_data)
                    
                    
            else:
                print('재생 실패')
                break
        # ==============================시퀀스 데이터 제작 및 저장===========================
        # ================================================================================= 
        
        full_seq_data = []
        
        for seq in range(len(data) - seq_length):
            full_seq_data.append(data[seq:seq + seq_length])
            
        full_seq_data = np.array(full_seq_data)
        np.save(os.path.join(f'{path}/data', f'{label_name}_왼손_idx_{word_dict[label_name]["idx"] * 2}_{video_file[:-4]}mp4'), full_seq_data)
        word_dict[label_name]["file_cnt"] += 1
        
        
        ####################################반전#######################################
          
        if label_name != 'default':
            
            full_seq_data = []
            
            for seq in range(len(data) - seq_length):
                full_seq_data.append(data_flip[seq:seq + seq_length])
                
            full_seq_data = np.array(full_seq_data)
            np.save(os.path.join(f'{path}/data', f'{label_name}_오른손_idx_{word_dict[label_name]["idx"] * 2 - 1}_{video_file[:-4]}mp4'), full_seq_data)
            word_dict[label_name]["file_cnt"] += 1
        
        cap.release()
        cv2.destroyAllWindows()
    else:
      print('error')


# 변경된 값 label.json에 적용
label['label_count'] = word_count
label['label'] = word_dict

with open(f'{path}/label.json', 'w', encoding='utf-8') as file:
    json.dump(label, file, indent="\t", ensure_ascii=False)