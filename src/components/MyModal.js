import React from "react";
import { Button } from "react-bootstrap";
import ReactModal from "react-modal";

const MyModal = ({ isOpen, onSubmit, onRequestClose, postCheck }) => {
  const handleClick = () => {
    onSubmit();
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 10,
          },
          content: {
            position: "absolute",
            top: "235px",
            left: "40px",
            right: "40px",
            bottom: "235px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            flexFlow: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {postCheck == 0 ? (
          <p style={{ flexGrow: 2 }}>추억이 등록되었습니다.</p>
        ) : postCheck == 1 ? (
          <p style={{ flexGrow: 2 }}>등록을 실패했습니다. 다시 등록해주세요</p>
        ) : postCheck == 2 ? (
          <p style={{ flexGrow: 2 }}>이미지를 삭제했습니다</p>
        ) : (
          <p style={{ flexGrow: 2 }}>초기화 되었습니다</p>
        )}

        <Button
          className="d-grid gap-2"
          onClick={handleClick}
          style={{ width: "100%", bottom: 0, transition: "all .2s" }}
        >
          확인
        </Button>
      </ReactModal>
    </div>
  );
};

export default MyModal;
