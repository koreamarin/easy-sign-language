# # 포즈
# 순간적으로 pose가 안보일 때를 고려해서 NaN배열을 넣어줘야함
# pose가 존재할때
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

# # 왼손
# 순간적으로 왼손이 안보일 때를 고려해서 zeros배열을 넣어줘야함
# 왼손이 존재할때
d_left = np.zeros((15,))

# ==========================================================================
# ==========================================================================



# # 오른손
# 순간적으로 오른손이 안보일 때를 고려해서 zeros배열을 넣어줘야함
# 오른손이 존재할때
if results.right_hand_landmarks is not None:
    joint_r = np.zeros((21, 3))
    
    for j, lm in enumerate(results.right_hand_landmarks.landmark):
        joint_r[j] = [lm.x, lm.y, lm.z]
    
    v1_r = joint_r[[0,1,2,3,0,5,6,7,0,9,10,11,0,13,14,15,0,17,18,19], :2]
    v2_r = joint_r[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], :2]
    v_r = v2_r - v1_r
    
    v_r = v_r /np.linalg.norm(v_r, axis=1)[:, np.newaxis]

    angle_r = np.arccos(np.einsum('nt,nt->n',
        v_r[[0,1,2,4,5,6,8,9,10,12,13,14,16,17,18],:], 
        v_r[[1,2,3,5,6,7,9,10,11,13,14,15,17,18,19],:]))
    
    # 계산 결과 : 15 * 1
    angle_r = np.degrees(angle_r)
    # 이미 pose에서 라벨링을 했으므로 따로 X
    
    # 15 * 1 벡터(angle_rabel -> 15 * 1)
    d_right = np.concatenate([angle_r])


# 오른손이 존재하지 않을 때
else:
    d_right = np.zeros((15,))