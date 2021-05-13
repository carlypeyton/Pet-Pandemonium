import React from "react";
import "./Instructions.css";

function Instructions() {
  return (
    <div className="instructions-container">
      <div className="row">
        <div className="col">
          <h1 className="text-center" id="instructions-title">Instructions</h1>
          <p id="instructions-body">This is a classic battleship style game. You will choose
          to compete as either cats or dogs, and will try to distract your
          opponent to ensure that your human's attention will belong solely to you!
          <br/>
          <br/>
          Place your pets on the board in the pattern that you believe will
          give you the best chance for success. Once you have placed all of your pets,
          you and your opponent will take turns lobbing treats and toys at each other.
          <br/>
          <br/>
          When a pet is hit with the appropriate number of treats or toys, they will be
          be distracted and will be off the board. Once all pets on one side are distracted, the
          winning side with claim all of the human's attention!!!
          </p>
        </div>
      </div>
    </div>
  )
};

export default Instructions;