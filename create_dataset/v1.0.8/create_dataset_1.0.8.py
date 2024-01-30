import mediapipe as mp
import cv2
import numpy as np
import json
import os


version = '1.0.7'

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
    # 시퀀스 길이 조절 -> 데이터의 최소 길이에서 - 8
    control_seq_len = label_info['data'][0]['seq_len']
    if seq_length < control_seq_len:
        seq_length = control_seq_len
seq_length = 10

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
                img = cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)
                
                # RGB로 변경된 프레임을 mediapipe로 인식
                results = holistic.process(img)
                
                
                # 데이터 추가 알고리즘
                
                # ==========================================================================
                # ==========================================================================
                
                
                if results.pose_landmarks and results.right_hand_landmarks:

    # 빈 벡터 생성
                    joint_p = np.zeros((14, 2))
                    
                    # 필요 keypoint만 저장하기 위한 알고리즘 -> 기존 pose는 33개의 keypoint
                    i = 0
                    for j, lm in enumerate(results.pose_landmarks.landmark):
                        if j in list(range(11, 25)):
                            joint_p[i] = [lm.x, lm.y]
                            i += 1  
                            
                    v1_p = joint_p[[1, 13], :]
                    v2_p = joint_p[[0, 1], :]
                    v_p = v2_p - v1_p    
                        
                    
                    joint_r = np.zeros((21, 2))
                    for j, lm in enumerate(results.right_hand_landmarks.landmark):
                        joint_r[j] = [lm.x, lm.y]
                        
                    v1_r = joint_r[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 0, 0, 5], :]
                    v2_r = joint_r[[2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 5, 17, 17], :]
                    v_r = v2_r - v1_r  
                    
                    v_p = v_p /np.linalg.norm(v_p, axis=1)[:, np.newaxis]
                    v_r = v_r /np.linalg.norm(v_r, axis=1)[:, np.newaxis]
                    # v_l = v_l /np.linalg.norm(v_l, axis=1)[:, np.newaxis]
                    

                    angle_p2 = np.arccos(np.einsum('nt,nt->n',
                            v_p[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], :],
                            v_r[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], :]))
                    
                    # angle_p1 = np.degrees(angle_p1)
                    angle_p2 = np.degrees(angle_p2)
                    
                    angle_p = np.concatenate([angle_p2])
                    

                    # 라벨 추가를 위한 빈공간 생성
                    angle_label = np.array([angle_p], dtype=np.float32)
                    
                    # 라벨 삽입
                    d_pose = np.append(angle_label, word_dict[label_name]['idx'] * 2 - 1)
                    # 13 * 1 벡터(12 각도데이터 + 1 라벨데이터)
                    
                else:
                    # 라벨 데이터를 붙여줘야함 -> 더미데이터 : 12 * 1, 라벨 데이터 -> 1 * 1
                    dumy_data = np.zeros((36,))
                    
                    # 라벨 데이터 합쳐주기
                    d_pose = np.array([dumy_data], dtype=np.float32)
                    d_pose = np.append(d_pose, word_dict[label_name]['idx'] * 2 - 1)

                # ==========================================================================
                # ==========================================================================
                
                # # 병합
                
                # d_pose 마지막에 라벨링이 존재하므로 pose를 마지막에 붙여줌
                # d_left : 15 * 1, d_right : 15 * 1, d_pose : 13 * 1 => 43 * 1
                d = d_pose

                data.append(d)
                
                
                #####################################좌우반전 데이터 생성##################################
                
                # 이미지 뒤집기
                img = cv2.flip(img, 1)
                
                # RGB로 변경된 프레임을 mediapipe로 인식
                results = holistic.process(img)
                
                
                if results.pose_landmarks and results.left_hand_landmarks:

    # 빈 벡터 생성
                    joint_p = np.zeros((14, 2))
                    
                    # 필요 keypoint만 저장하기 위한 알고리즘 -> 기존 pose는 33개의 keypoint
                    i = 0
                    for j, lm in enumerate(results.pose_landmarks.landmark):
                        if j in list(range(11, 25)):
                            joint_p[i] = [lm.x, lm.y]
                            i += 1  
                            
                    v1_p = joint_p[[1, 13], :]
                    v2_p = joint_p[[0, 1], :]
                    v_p = v2_p - v1_p    
                        
                    
                    joint_r = np.zeros((21, 2))
                    for j, lm in enumerate(results.left_hand_landmarks.landmark):
                        joint_r[j] = [lm.x, lm.y]
                        
                    v1_r = joint_r[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 0, 0, 5], :]
                    v2_r = joint_r[[2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 5, 17, 17], :]
                    v_r = v2_r - v1_r  
                    
                    v_p = v_p /np.linalg.norm(v_p, axis=1)[:, np.newaxis]
                    v_r = v_r /np.linalg.norm(v_r, axis=1)[:, np.newaxis]
                    # v_l = v_l /np.linalg.norm(v_l, axis=1)[:, np.newaxis]
                    

                    angle_p2 = np.arccos(np.einsum('nt,nt->n',
                            v_p[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], :],
                            v_r[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], :]))
                    
                    # angle_p1 = np.degrees(angle_p1)
                    angle_p2 = np.degrees(angle_p2)
                    
                    angle_p = np.concatenate([angle_p2])
                    

                    # 라벨 추가를 위한 빈공간 생성
                    angle_label = np.array([angle_p], dtype=np.float32)
                    
                    # 라벨 삽입
                    d_pose = np.append(angle_label, word_dict[label_name]['idx'] * 2 - 1)
                    # 13 * 1 벡터(12 각도데이터 + 1 라벨데이터)
                    
                else:
                    # 라벨 데이터를 붙여줘야함 -> 더미데이터 : 12 * 1, 라벨 데이터 -> 1 * 1
                    dumy_data = np.zeros((36,))
                    
                    # 라벨 데이터 합쳐주기
                    d_pose = np.array([dumy_data], dtype=np.float32)
                    d_pose = np.append(d_pose, word_dict[label_name]['idx'] * 2 - 1)

                # ==========================================================================
                # ==========================================================================
                
                # # 병합
                
                # d_pose 마지막에 라벨링이 존재하므로 pose를 마지막에 붙여줌
                # d_left : 15 * 1, d_right : 15 * 1, d_pose : 13 * 1 => 43 * 1
                d = d_pose

                data_flip.append(d)

            

            else:
                print('재생 실패')
                break
        # ==============================시퀀스 데이터 제작 및 저장===========================
        # ================================================================================= 
        if label_name != 'default':
            
            full_seq_data = []
            
            for seq in range(len(data) - seq_length):
                full_seq_data.append(data[seq:seq + seq_length])
                
            full_seq_data = np.array(full_seq_data)
            np.save(os.path.join(f'{path}/data', f'{label_name}_오른손_idx_{word_dict[label_name]["idx"] * 2 - 1}_{video_file[:-4]}mp4'), full_seq_data)
            word_dict[label_name]["file_cnt"] += 1
        
        ####################################반전#######################################
        
        full_seq_data = []
        
        for seq in range(len(data) - seq_length):
            full_seq_data.append(data_flip[seq:seq + seq_length])
            
        full_seq_data = np.array(full_seq_data)
        np.save(os.path.join(f'{path}/data', f'{label_name}_왼손_idx_{word_dict[label_name]["idx"] * 2}_{video_file[:-4]}mp4'), full_seq_data)
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