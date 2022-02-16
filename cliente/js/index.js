import { cena1 } from "./cena1.js";
import { cena2 } from "./cena2.js";
import { cena3 } from "./cena3.js";
import { cena4 } from "./cena4.js";
import { cena5 } from "./cena5.js";

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 650,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1000,
    height: 650,
  },
  scene: [cena1, cena2, cena3, cena4, cena5],
};

var game = new Phaser.Game(config);
