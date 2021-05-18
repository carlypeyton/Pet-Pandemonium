import React from "react";
import { Redirect } from "react-router-dom";
import RandExp from "randexp";

import "./invite.css";
import { useSocketContext } from "../../utils/SocketState";
import { useUserContext } from "../../utils/UserState";
import { useGameContext } from "../../utils/GameState";
import { useChatContext } from "../../utils/ChatState";

const ReceiveInvite = ({ show, close, invite }) => {
  const socket = useSocketContext();
  const [userState, userDispatch] = useUserContext();
  const [gameState, gameDispatch] = useGameContext();
  const [chatState, chatDispatch] = useChatContext();

  const acceptInvite = () => {
    console.log(invite);
    const GameId = new RandExp(/\w{9}/).gen();
    const gameInit = {
      challenger: {
        userName: invite.challenger.userName,
        socketId: invite.challenger.socketId,
        userId: invite.challenger._id
      },
      defender: {
        userName: userState.userName,
        userId: userState._id,
        socketId: userState.socketId
      },
      gameId: GameId
    };
    gameDispatch({ type: "CHALLENGE_ACCEPTED", data: gameInit });
    chatDispatch({ type: "CHANGE_ROOM", data: gameInit.gameId });
    socket.emit("challenge_accepted", gameInit);
  };

  return (
    <div className="my-modal" style={{ display: show ? "flex" : "none" }}>
      <div className="my-modal-content">
        <div className="my-modal-header">
          <h5 className="my-modal-title">Someone has asked you to play!</h5>
        </div>
        <div className="my-modal-body">
          <p>
            {invite.challenger.userName} has invited you to play a game of Pet
            Pandemonium. Remeber to be a good sport.
          </p>
        </div>
        <div className="my-modal-footer">
          <button type="button" className="btn-accept" onClick={acceptInvite}>
            Accept
          </button>
          <button
            type="button"
            className="btn-close"
            data-dismiss="modal"
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveInvite;
