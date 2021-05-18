import React from "react";

const WaitingOnPets = () => {
  return (
    <div className="my-modal" style={{ display: "flex" }}>
      <div className="my-modal-content">
        <div className="my-modal-header">
          <h3 className="my-modal-title">Waiting For Opponent to Place Pets</h3>
        </div>
        <div className="my-modal-body">
          <p>
            Your opponent is still deciding the best places for their pets to
            nap!
          </p>
        </div>
        <div className="my-modal-footer"></div>
      </div>
    </div>
  );
};

export default WaitingOnPets;
