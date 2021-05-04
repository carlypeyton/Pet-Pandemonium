import React from "react";

function Instructions() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Instructions</h1>
          <p>This is a classic battleship style game. You will choose
          to compete as either cats or dogs, and will try to distract your
          opponent to ensure that your human's attention will belong solely to you!
      </p>
          <br />
          <p>Place your pets on the board in the pattern that you believe will
          give you the best chance for success. Once you have placed all of your pets,
          you and your opponent will take turns lobbing treats and toys at each other.
      </p>
          <br />
          <p>When a pet is hit with the appropriate number of treats or toys, they will be
          be distracted and will be off the board. Once all pets on one side are distracted, the
          winning side with claim all of the human's attention!!!
      </p>
        </div>
      </div>
    </div>
  )
};

export default Instructions;