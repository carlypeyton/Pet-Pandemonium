import React from "react";

function SideBtns() {
  return (
    <div className="container">
      <div className="row">
        <h1>Choose Your Side</h1>
        <div className="col">
          <button type="button" id="dogs-button">Dogs</button>
        </div>
        <div className="col">
          <button type="button" id="cats-button">Cats</button>
        </div>
      </div>
    </div>
  )
};

export default SideBtns;