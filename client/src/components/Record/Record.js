import React from "react";
import RecordStyle from "./Record.css";

function Record() {
  return (
    <div className="row" style={RecordStyle}>
      <div className="col">
        <div className="total-record"></div>
        <h2>Record</h2>
      </div>
    </div>
  );
}

export default Record;
