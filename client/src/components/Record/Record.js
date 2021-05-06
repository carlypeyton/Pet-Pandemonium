import React from "react";

function Record() {
  return (
    <div className="row">
      <div className="col">
        <div className="win-list">
          <h2>Wins</h2>
          <ul>
            <li className="list-group-item"></li>
          </ul>
        </div>
      </div>
      <div className="col">
        <div className="total-record"></div>
        <h2>Record</h2>
      </div>
      <div className="col">
        <div className="loss-list"></div>
        <h2>Losses</h2>
        <ul>
          <li className="list-group-item"></li>
        </ul>
      </div>
    </div>
  );
}

export default Record;
