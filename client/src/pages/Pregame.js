import React from "react";
import Instructions from "../components/Instructions/Instructions.js";
import SideBtns from "../components/SideBtns/SideBtns.js";
import Setup from "../components/Setup/Setup.js";

const Pregame = () => {
  return (
    <div className="container">
      <Instructions />
      <br />
      <SideBtns />
      <br />
      <Setup />
    </div>
  )
};

export default Pregame;
