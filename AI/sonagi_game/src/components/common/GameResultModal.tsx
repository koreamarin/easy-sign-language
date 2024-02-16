import GoodSteamp from "../../assets/images/GoodStamp.png";
import Sticker from "../../assets/images/sticker.png";
import MediumButton from "../Button/MediumButton";
import CryingEmoji from "../../assets/images/CryingEmoji.png";
import SonagiEngine from "../Sonagi/SonagiEngine";
import { SonagiLevelUp } from "../Sonagi/SonagiConfig";

interface GameResultModalProps {
  success: boolean;
  setSuccess: (success: boolean) => void;
  BookmarkButton: boolean;
  shown: boolean;
  setModalShown: (shown: boolean) => void;
  stickerNum: number;
  signId: number;

  Sonagi: SonagiEngine;
  setWords : (words: string[]) => void;
}

const GameResultModal = ({
  success,
  setSuccess,
  shown,
  setModalShown,
  BookmarkButton,
  stickerNum,
  signId,
  Sonagi,
  setWords,
}: GameResultModalProps) => {
  const next = () => {
    setSuccess(false);
    setModalShown(false);
		SonagiLevelUp();
		setWords(["ㄱ","ㅂ","ㄴ","ㅇ","ㅈ","ㅁ","ㅋ", "ㅎ"]);
		
  };
  const replay = () => {
    setModalShown(false);
    // setWords(["쥐","소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지"]);
    setWords(["ㄱ","ㅂ","ㄴ","ㅇ","ㅈ","ㅁ","ㅋ", "ㅎ"]);
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
            {
              <>
                {/* <MediumButton text={"다시해보기"} color="skyblue" onClick={replay} /> */}
                <MediumButton text={"다음단계로"} color="pink" onClick={next} />
              </>
            }
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
              <div>소나기를 모두 막아내지 못했어요!</div>
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
              {
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
                </>
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameResultModal;
