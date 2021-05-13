import React from "react";
import "./Record.css";

import { useUserContext } from "../../utils/UserState";

function Record() {
  const [userState, userDispatch] = useUserContext();

  return (
    <div className="row">
      <div className="col">
        <div className="total-record"></div>
        <h2 id="record">Record</h2>
        <p>
          {userState.wins} win{userState.wins === 1 ? "" : "s"} and{" "}
          {userState.losses} loss{userState.losses === 1 ? "" : "es"}
        </p>
      </div>
    </div>
  );
}

export default Record;
