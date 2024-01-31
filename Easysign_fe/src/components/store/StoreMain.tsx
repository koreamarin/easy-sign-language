import React from "react";

// mui 관련 import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ConfirmPurchase from "../modals/ConfirmPurchase";
import Purchase from "../modals/Purchase";
import AfterPurchase from "../modals/AfterPurchase";

function StoreMain() {
  // 구매확인 모달 작동하는 함수
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 구매 모달 작동하는 함수
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // 구매이후 모달 작동하는 함수
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "371px",
    height: "279px",
  };

  const style2 = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "371px",
    height: "308px",
  };
  return (
    <div>
      <div>
        {/* 구매 모달 구현 */}
        <Button onClick={handleOpen2}>구매 모달 창</Button>
        <Modal open={open2} onClose={handleClose2}>
          <Box sx={style2}>
            <Purchase />
          </Box>
        </Modal>
        {/* 구매 확인 모달 */}
        <Button onClick={handleOpen}>구매 확인 모달 창</Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <ConfirmPurchase />
          </Box>
        </Modal>
        {/* 구매 이후 모달 */}
        <Button onClick={handleOpen3}>구매 이후 모달 창</Button>
        <Modal open={open3} onClose={handleClose3}>
          <Box sx={style}>
            <AfterPurchase />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default StoreMain;
