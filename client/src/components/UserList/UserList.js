import React, { useEffect } from "react";

import UserData from "./UserData";
import "./userlist.css";

import { useChatContext } from "../../utils/ChatState";

const UserList = () => {
  const [{ users }, chatDispatch] = useChatContext();

  return (
    <div className="container user-list">
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <td>User Name</td>
            <td>Wins</td>
            <td>Losses</td>
            <td>Challenge</td>
          </tr>
        </thead>
        <tbody id="users">
          {users ? (
            users.map(user => <UserData user={user} key={user.socketId} />)
          ) : (
            <tr>
              <td>{"..."}</td>
              <td>{"Loading"}</td>
              <td>{"..."}</td>
              <td>{"Loading"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
