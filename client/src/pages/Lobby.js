import React from "react";
import Record from "../components/Record/Record.js";
import Chat from "../components/Chat/Chat";
import Sounds from "../components/Sounds/Sounds"

const Lobby = () => {
  return (
    <div className="container">
      <Record />
      <Chat />
      <Sounds />
      {/* User status, record, challenge or private chat */}
      {/* Chat */}
    </div>
  );
};

export default Lobby;
