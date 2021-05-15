// import pet images here and attach to each object by using a variable
import munchkin from "../assets/img/munchkin.png";
import tuxedo from "../assets/img/tuxedokitty.png";
import glowy from "../assets/img/glowykitty.png";
import maine_coon from "../assets/img/mainecoon.png";
import savanna from "../assets/img/savannahcat.png";

import sammie from "../assets/img/sammie.png";
import sheeb from "../assets/img/sheeb.png";
import corgi from "../assets/img/corgi.png";
import toast from "../assets/img/Toast.png";
import great_dane from "../assets/img/great_dane.png";

const cats = [
  {
    name: "Munchkin",
    length: 2,
    remainingHealth: 2,
    position: 101,
    image: munchkin,
    horizontal: true
  },
  {
    name: "Tuxedo",
    length: 3,
    remainingHealth: 3,
    position: 102,
    image: tuxedo,
    horizontal: true
  },
  {
    name: "Conductor",
    length: 3,
    remainingHealth: 3,
    position: 103,
    image: glowy,
    horizontal: true
  },
  {
    name: "Maine Coon",
    length: 4,
    remainingHealth: 4,
    position: 104,
    image: maine_coon,
    horizontal: true
  },
  {
    name: "Savanna",
    length: 5,
    remainingHealth: 5,
    position: 105,
    image: savanna,
    horizontal: true
  }
];

const dogs = [
  {
    name: "Yorkshire",
    length: 2,
    remainingHealth: 2,
    position: 101,
    image: sammie,
    horizontal: true
  },
  {
    name: "Shiba Inu",
    length: 3,
    remainingHealth: 3,
    position: 102,
    image: sheeb,
    horizontal: true
  },
  {
    name: "Corgi",
    length: 3,
    remainingHealth: 3,
    position: 103,
    image: corgi,
    horizontal: true
  },
  {
    name: "Toast",
    length: 4,
    remainingHealth: 4,
    position: 104,
    image: toast,
    horizontal: true
  },
  {
    name: "Great Dane",
    length: 5,
    remainingHealth: 5,
    position: 105,
    image: great_dane,
    horizontal: true
  }
];

const pets = {
  cats,
  dogs
};

export default pets;
