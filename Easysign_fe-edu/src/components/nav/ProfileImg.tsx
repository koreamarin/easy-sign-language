import basic_profile_img from "../../assets/images/basic_profile_img.svg";
import styled from "styled-components";

const Containers = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    width: 130px;
    height: 130px;
    border: 5px solid #ffcfd8;
  }
`;

interface ProfileImgProps {
  src?: string;
}

const ProfileImg = ({ src = basic_profile_img }: ProfileImgProps) => {
  return (
    <div>
      <Containers src={src} alt="profile_img" />
    </div>
  );
};

export default ProfileImg;
