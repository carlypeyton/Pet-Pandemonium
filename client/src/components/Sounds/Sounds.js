import React from "react";
import {Howl, Howler} from 'howler';
import howls from '../../utils/howls';


const noises = (event) => {
  event.preventDefault();
  howls.angry();
}

function Sounds() {
  return (
    <button onClick={noises}>noises</button>
  )
}

export default Sounds;