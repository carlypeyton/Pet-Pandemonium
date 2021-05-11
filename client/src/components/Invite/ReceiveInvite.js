import React from "react";
import { Redirect } from "react-router-dom";
import "./invite.css";
import { useSocketContext } from "../../utils/SocketState";
import { useUserContext } from "../../utils/UserState";
import { useGameContext } from "../../utils/GameState";

const ReceiveInvite = ({ show, close, invite }) => {
  const socket = useSocketContext();
  const [userState, userDispatch] = useUserContext();
  const [gameState, gameDispatch] = useGameContext();

  const acceptInvite = () => {
    console.log(userState);
    console.log(invite);
    const gameInit = {
      challenger: {
        userName: invite.userName,
        _id: invite._id,
        socketId: invite.socketId
      },
      defender: {
        userName: userState.userName,
        _id: userState._id,
        socketId: userState.socketId
      },
      gameId: "demo"
    };
    gameDispatch({ type: "CHALLENGE_ACCEPTED", data: gameInit });
    socket.emit("challenge_accepted", gameInit);
  };

  if (gameState.gamePhase !== "none") {
    return <Redirect to="/game" />;
  }
  return (
    <div className="my-modal" style={{ display: show ? "flex" : "none" }}>
      <div className="my-modal-content">
        <div className="my-modal-header">
          <h5 className="my-modal-title">Someone has asked you to play!</h5>
        </div>
        <div className="my-modal-body">
          <p>
            has invited you to play a game of Pet Pandemonium. Remeber to be a
            good sport.
          </p>
        </div>
        <div className="my-modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={acceptInvite}
          >
            Accept
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
