import { cena1 } from "./cena1.js";
import { cena2 } from "./cena2.js";
import { cena3 } from "./cena3.js";
import { cena4 } from "./cena4.js";

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 650,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [cena1, cena2, cena3, cena4],
};

var game = new Phaser.Game(config);
