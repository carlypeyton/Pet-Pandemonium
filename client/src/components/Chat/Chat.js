import React, {useRef} from "react";
import "./chat.css";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const Chat = () => {
    const inputRef = useRef()
   const sendSocketIO = (event) => {
       event.preventDefault();
        socket.emit('example_message', inputRef.current.value);
    }  
    return (
    <div>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autocomplete="off" ref={inputRef} />
        <button onClick={sendSocketIO}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
