import MediumButton from "../Button/MediumButton";
import styled from "styled-components";
import SSmallButton from "../Button/SSmallButton";
import { useNavigate } from "react-router";
const Containers = styled.div`
  width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div {
    padding-top: 10px;
    display: none;
    width: 250px;
    height: px;
  }

  &:hover div {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    float: left;
    gap: 10px;
  }
`;

interface EduButtonsProps {
  title: string;
  subtitle: string[];
  subtitleOnClick: string[];
  Activate?: boolean[];
}

const EduButtons = ({ title, subtitle, subtitleOnClick, Activate }: EduButtonsProps) => {
  const navigate = useNavigate();
  return (
    <Containers>
      <span>
        <MediumButton text={title} color={"blue"} onClick={() => ""} />
      </span>
      <div>
        {subtitle.map((text, index) => (
          <SSmallButton
            key={index}
            text={text}
            color={"skyblue"}
            onClick={() => navigate(subtitleOnClick[index])}
            Activate={Activate ? Activate[index] : true}
          />
        ))}
      </div>
    </Containers>
  );
};

export default EduButtons;
