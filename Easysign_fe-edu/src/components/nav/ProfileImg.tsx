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
  if (typeof CharacterSrc === "undefined" || typeof backgroundSrc === "undefined") {
    return (
      <div>
        <CharacterImg src={basic_profile_img} alt="profile_img" />
      </div>
    );
  }
  return (
    <div>
      <CharacterImg src={CharacterSrc} backgroundSrc={backgroundSrc} alt="profile_img" />
    </div>
  );
};

export default ProfileImg;
