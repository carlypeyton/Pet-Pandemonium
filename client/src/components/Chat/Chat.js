import React, { useRef, useEffect, useState } from "react";
import "./chat.css";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");


const Chat = () => {
  const [chatLog, setChatLog] = useState([]);
  const inputRef = useRef();
  const sendSocketIO = (event) => {
    console.log(chatLog);
    event.preventDefault();
    socket.emit("chat_message", inputRef.current.value);
  };
  useEffect(() => {
    console.log("test");
    socket.on("chat_message", (data) => {
      console.log(chatLog);
      let newChatLog = [...chatLog, data];
      console.log(newChatLog);
      setChatLog(newChatLog);
    });
  }, [chatLog]);
  return (
    <div>
      <ul id="messages">
        {chatLog.map((msg, index) => {
          return <li key={index}>{msg}</li>;
        })}
      </ul>
      <form id="form" action="">
        <input id="input" autocomplete="off" ref={inputRef} />
        <button onClick={sendSocketIO}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
