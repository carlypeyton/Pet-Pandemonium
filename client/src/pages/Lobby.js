import React from "react";
import Record from "../components/Record/Record.js";
import Chat from "../components/Chat/Chat";

const Lobby = () => {
  return (
    <div className="container">
      <Record />
      <Chat />
      {/* User status, record, challenge or private chat */}
      {/* Chat */}
    </div>
  );
};

export default Lobby;
