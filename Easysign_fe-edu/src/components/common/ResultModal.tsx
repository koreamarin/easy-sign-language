import GoodSteamp from "../../assets/images/GoodStamp.png";
import Sticker from "../../assets/images/sticker.png";
import MediumButton from "../Button/MediumButton";
import CryingEmoji from "../../assets/images/CryingEmoji.png";
import { useDispatch } from "react-redux";
import { IncorrectAnswerRateSet, LearningProgressSet } from "../../redux/modules/ProgressSlice";
import { followStatusFalse } from "../../redux/modules/LectureSlice";

interface ResultModalProps {
  success: boolean;
  setSuccess: (success: boolean) => void;
  BookmarkButton: boolean;
  shown: boolean;
  setModalShown: (shown: boolean) => void;
  stickerNum: number;
  currentNum: number;
  currentNumModify: (currentNum: number) => void;
  totalNum: number;
  signId: number;
}

const ResultModal = ({
  success,
  setSuccess,
  shown,
  setModalShown,
  BookmarkButton,
  stickerNum,
  currentNum,
  currentNumModify,
  totalNum,
  signId,
}: ResultModalProps) => {
  const dispatch = useDispatch();
  const next = () => {
    setSuccess(false);
    setModalShown(false);
    currentNumModify(currentNum + 1);
    dispatch(followStatusFalse());
  };
  const replay = () => {
    setModalShown(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "7px",
        left: "10px",
        width: "1060px",
        height: "850px",
        backgroundColor: "#FFF5E7",
        borderRadius: "60px",
        display: shown ? "flex" : "none",
        boxShadow: "5px 5px 5px 5px gray",
      }}
    >
      {success ? (
        <div
          style={{
            position: "relative",
            top: "60px",
            left: "40px",
            width: "980px",
            height: "700px",
            borderRadius: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                position: "relative",
                top: "-10px",
                left: "140px",
              }}
              src={GoodSteamp}
              alt="goodsteamp"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                top: "240px",
                left: "80px",
              }}
            >
              <img
                style={{
                  position: "relative",
                  width: "130px",
                  height: "130px",
                }}
                src={Sticker}
                alt="sticker"
              />
              <div
                style={{
                  width: "270px",
                  fontSize: "28px",
                  fontWeight: "900",
                  textAlign: "center",
                }}
              >
                스티커 {stickerNum}개 획득!!
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
              top: "30px",
              width: "900px",
              justifyContent: "space-around",
            }}
          >
            {BookmarkButton ? (
              <>
                <MediumButton text={"다시s해보기"} color="skyblue" onClick={replay} />
                <MediumButton
                  text={"단어장추가"}
                  color="lightgreen"
                  onClick={() => console.log(signId + "번 수화를 북마크에 추가합니다.")}
                />
                <MediumButton text={"다음단어로"} color="pink" onClick={next} />
              </>
            ) : (
              <>
                <MediumButton text={"다시해보기"} color="skyblue" onClick={replay} />
                <MediumButton text={"다음단어로"} color="pink" onClick={next} />
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              top: "25px",
              left: "30px",
              width: "1000px",
              height: "800px",
            }}
          >
            <div style={{}}>
              <img src={CryingEmoji} alt="cryingemoji" />
            </div>
            <div
              style={{
                fontSize: "50px",
                color: "#833F00",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "1.5",
              }}
            >
              <div>아쉽게 틀렸어요!</div>
              <div>다시 해 볼까요?</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
                top: "77px",
                width: "900px",
                justifyContent: "space-around",
              }}
            >
              {BookmarkButton ? (
                <>
                  <div
                    style={{
                      position: "relative",
                      top: "-71px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                        position: "relative",
                        top: "-10px",
                      }}
                    >
                      <img src={Sticker} alt="sticker" width={"50px"} />
                      <div>성공 시 스티커 {stickerNum}개 획득!!</div>
                    </div>
                    <MediumButton text={"다시해보기"} color="skyblue" onClick={replay} />
                  </div>
                  <MediumButton
                    text={"단어장추가"}
                    color="lightgreen"
                    onClick={() => console.log(signId + "번 수화를 북마크에 추가합니다.")}
                  />
                  <MediumButton text={"다음단어로"} color="pink" onClick={next} />
                </>
              ) : (
                <>
                  <div
                    style={{
                      position: "relative",
                      top: "-71px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                        position: "relative",
                        top: "-10px",
                      }}
                    >
                      <img src={Sticker} alt="sticker" width={"50px"} />
                      <div>성공 시 스티커 {stickerNum}개 획득!!</div>
                    </div>
                    <MediumButton text={"다시해보기"} color="skyblue" onClick={replay} />
                  </div>
                  <MediumButton text={"다음단어로"} color="pink" onClick={next} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultModal;
