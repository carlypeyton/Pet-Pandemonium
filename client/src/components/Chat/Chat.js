import React, { useRef, useEffect, useState } from "react";
import "./chat.css";
import { useSocketContext } from "../../utils/SocketState";

const Chat = () => {
  const inputRef = useRef();
  const [socketState, socketDispatch] = useSocketContext();
  const { room, user, chatLog, socket } = socketState;

  useEffect(() => {
    //socket = io(CONNECTION_PORT);
    socket.emit("join_room", {
      room: room,
      user: user,
      text: `has joined room ${room}`
    });
  }, [room]);

  useEffect(() => {
    socket.on("receive_message", data => {
      socketDispatch({
        type: "RECEIVE_MESSAGE",
        data
      });
    });
  }, [socket]);

  const sendMessage = event => {
    event.preventDefault();
    let newMessage = {
      room,
      user,
      text: inputRef.current.value
    };
    inputRef.current.value = "";
    socketDispatch({ type: "SEND_MESSAGE", data: newMessage });
  };

  return (
    <div className="container">
      <ul id="messages">
        {chatLog.map((msg, index) => {
          return <li key={index}>{msg.user + " " + msg.text}</li>;
        })}
      </ul>
      <form id="form" action="">
        <input id="input" autoComplete="off" ref={inputRef} />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
