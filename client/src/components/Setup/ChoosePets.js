import React from "react";

import SideBtns from "./SideBtns/SideBtns";

const ReceiveInvite = () => {
  return (
    <div className="my-modal" style={{ display: "flex" }}>
      <div className="my-modal-content">
        <div className="my-modal-header">
          <h5 className="my-modal-title text-align-center">
            CHOOSE YOUR PETS!
          </h5>
        </div>
        <div className="my-modal-body">
          <p>Choose whether you want to play with cats or dogs!</p>
        </div>
        <div className="my-modal-footer">
          <SideBtns />
        </div>
      </div>
    </div>
  );
};

export default ReceiveInvite;
