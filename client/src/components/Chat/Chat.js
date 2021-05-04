import React, { useRef, useEffect, useState } from "react";
import "./chat.css";
//import io from "socket.io-client";
//const socket = io("http://localhost:3001");
import socket from "../../utils/socket";
//let socket;

const Chat = () => {
  const [chatLog, setChatLog] = useState([]);
  const [user, setUser] = useState("Anon");
  const [room, setRoom] = useState("Main");
  const inputRef = useRef();

  useEffect(() => {
    //socket = io(CONNECTION_PORT);
    socket.emit("join_room", room);
  }, [room]);

  useEffect(() => {
    socket.on("receive_message", data => {
      setChatLog([...chatLog, data]);
    });
  }, [chatLog]);

  const sendMessage = async event => {
    event.preventDefault();
    let newMessage = {
      room,
      user,
      text: inputRef.current.value
    };
    await socket.emit("chat_message", newMessage);
    setChatLog([...chatLog, newMessage]);
    inputRef.current.value = "";
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
