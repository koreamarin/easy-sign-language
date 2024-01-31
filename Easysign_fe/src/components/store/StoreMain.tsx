import React from "react";
import styled from "styled-components";
// mui 관련 import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ConfirmPurchase from "../modals/ConfirmPurchase";

function StoreMain() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "371px",
    height: "279px",
  };
  return (
    <div>
      <div>
        {/* 시험용 모달 구현 */}
        <Button onClick={handleOpen}>구매 확인 모달 창</Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <ConfirmPurchase />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default StoreMain;
