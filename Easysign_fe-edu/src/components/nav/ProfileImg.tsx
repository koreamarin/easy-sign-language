import basic_profile_img from "../../assets/images/basic_profile_img.svg";
import styled from "styled-components";

export const Div = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #ffcfd8;
  }
`;

interface ProfileImgProps {
  backgroundSrc?: string;
  CharacterSrc?: string;
}

const ProfileImg = ({ backgroundSrc, CharacterSrc }: ProfileImgProps) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = basic_profile_img; // 기본 이미지로 설정
  };

  return (
    <Div onError={handleError}>
      <img
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          position: "absolute",
          top: "4px",
          left: "4px",
        }}
        src={backgroundSrc}
        alt="profile"
      />
      <img
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          position: "absolute",
          left: "24px",
          top: "24px",
        }}
        src={CharacterSrc}
        alt="profile"
      />
    </Div>
  );
};

export default ProfileImg;
