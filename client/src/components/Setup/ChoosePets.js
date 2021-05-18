import React from "react";

import SideBtns from "../SideBtns/SideBtns";

const ReceiveInvite = () => {
  return (
    <div className="my-modal" style={{ display: "flex" }}>
      <div className="my-modal-content">
        <div className="my-modal-header">
          <h5 className="my-modal-title">Choose your side!</h5>
        </div>
        <div className="my-modal-body">
          <p>Choose your pets</p>
        </div>
        <div className="my-modal-footer">
          <SideBtns />
        </div>
      </div>
    </div>
  );
};

export default ReceiveInvite;
