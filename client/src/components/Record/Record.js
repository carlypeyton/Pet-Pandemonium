import React from "react";

function Record() {
  return (
    <div classname="row">
      <div classname="col">
        <div classname="win-list">
          <h2>Wins</h2>
          <ul>
            <li classname="list-group-item"></li>
          </ul>
        </div>
      </div>
      <div classname="col">
        <div classname="total-record"></div>
        <h2>Record</h2>
      </div>
      <div classname="col">
        <div classname="loss-list"></div>
        <h2>Losses</h2>
        <ul>
          <li classname="list-group-item"></li>
        </ul>
      </div>
    </div>
  )
};

export default Record;