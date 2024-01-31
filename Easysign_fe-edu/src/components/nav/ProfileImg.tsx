import basic_profile_img from "../../assets/images/basic_profile_img.svg";

interface ProfileImgProps {
  src?: string;
}

const ProfileImg = ({ src = basic_profile_img }: ProfileImgProps) => {
  return (
    <div>
      <img
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
        }}
        src={src}
        alt="profile_img"
      />
    </div>
  );
};

export default ProfileImg;
