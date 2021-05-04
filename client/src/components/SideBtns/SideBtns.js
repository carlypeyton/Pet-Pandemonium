import React from "react";

function SideBtns() {
  return (
    <div className="container">
      <div className="row">
        <h1>Choose Your Side</h1>
      </div>
      <div className="row">
        <div className="col text-right">
          <button type="button" className="btn btn-primary" id="dogs-button">Dogs</button>
        </div>
        <div className="col text-left">
          <button type="button" className="btn btn-primary"id="cats-button">Cats</button>
        </div>
      </div>
    </div>
  )
};

export default SideBtns;