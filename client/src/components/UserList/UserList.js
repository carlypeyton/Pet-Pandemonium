import React, { useEffect } from "react";

import UserData from "./UserData";
import "./userlist.css";

import { useChatContext } from "../../utils/ChatState";

const UserList = () => {
  const [{ users }, chatDispatch] = useChatContext();

  return (
    <div className="user-list">
      <div className="row">
        <div className="col" id="users">
          {users.map(user => {
            return <UserData user={user} key={user.socketId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
