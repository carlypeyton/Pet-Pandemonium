import React, { useRef, useEffect, useState } from "react";
import "./chat.css";
import { useSocketContext } from "../../utils/SocketState";
import { useChatContext } from "../../utils/ChatState";

const Chat = () => {
  const inputRef = useRef();
  const socket = useSocketContext();
  const [{ room, userName, chatLog }, chatDispatch] = useChatContext();

  useEffect(() => {
    //socket = io(CONNECTION_PORT);
    socket.emit("join_room", {
      room,
      userName,
      text: `has joined room ${room}`
    });
  }, [room]);

  useEffect(() => {
    socket.on("receive_message", data => {
      chatDispatch({
        type: "RECEIVE_MESSAGE",
        data
      });
    });
  }, [socket]);

  const sendMessage = event => {
    event.preventDefault();
    let newMessage = {
      room,
      userName,
      text: inputRef.current.value
    };
    inputRef.current.value = "";
    socket.emit("chat_message", newMessage);
    chatDispatch({ type: "SEND_MESSAGE", data: newMessage });
  };

  return (
    <div className="chat-box">
      <div className="chat-msg">
        <ul id="messages">
          {chatLog.map((msg, index) => {
            return <li key={index}>{msg.userName + " " + msg.text}</li>;
          })}
        </ul>
      </div>
      <form id="form" action="" className="align-bottom">
        <input id="input" autoComplete="off" ref={inputRef} />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
