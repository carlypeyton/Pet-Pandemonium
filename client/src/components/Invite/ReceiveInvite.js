import React from "react";
import "./invite.css";

const ReceiveInvite = ({ show, close }) => {
  const acceptInvite = () => {};

  return (
    <div className="my-modal" style={{ display: show ? "flex" : "none" }}>
      <div className="my-modal-content">
        <div className="my-modal-header">
          <h5 className="my-modal-title">Modal title</h5>
        </div>
        <div className="my-modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div className="my-modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={acceptInvite}
          >
            Invite to Play
          </button>
          <button type="button" data-dismiss="modal" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveInvite;
