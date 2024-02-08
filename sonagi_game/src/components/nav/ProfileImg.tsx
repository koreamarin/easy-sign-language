import basic_profile_img from "../../assets/images/basic_profile_img.svg";
import styled from "styled-components";

interface CharacterImgProps {
  backgroundSrc?: string;
}

const CharacterImg = styled.img<CharacterImgProps>`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  cursor: pointer;
  background-image: url(${(props) => props.backgroundSrc});
  &:hover {
    width: 131px;
    height: 131px;
    border: 5px solid #ffcfd8;
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

  if (typeof CharacterSrc === undefined || typeof backgroundSrc === undefined) {
    return (
      <div>
        <CharacterImg src={basic_profile_img} onError={handleError} />
      </div>
    );
  }
  return (
    <div>
      <CharacterImg src={CharacterSrc} backgroundSrc={backgroundSrc} onError={handleError} />
    </div>
  );
};

export default ProfileImg;
