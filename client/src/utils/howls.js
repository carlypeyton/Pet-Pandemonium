import angry from "../assets/sounds/angrykitty.mp3";
import hiss from "../assets/sounds/cathiss.mp3";
import bark from "../assets/sounds/dogbark.mp3";
import growl from "../assets/sounds/dogbarkgrowl.mp3";
import meow from "../assets/sounds/kittenmeow.mp3";
import squeak from "../assets/sounds/squeakytoy.mp3";
import { Howl } from "howler";

const howls = {
  angry: () => {
    const angrykitty = new Howl({
      src: [angry]
    });
    angrykitty.play();
  },
  hiss: () => {
    const cathiss = new Howl({
      src: [hiss]
    });
    cathiss.play();
  },
  bark: () => {
    const dogbark = new Howl({
      src: [bark]
    });
    dogbark.play();
  },
  growl: () => {
    const doggrowl = new Howl({
      src: [growl]
    });
    doggrowl.play();
  },
  meow: () => {
    const catmeow = new Howl({
      src: [meow]
    });
    catmeow.play();
  },
  squeak: () => {
    const toysqueak = new Howl({
      src: [squeak]
    });
    toysqueak.play();
  }
};

export default howls;
