import { cena1 } from "./cena1.js";

var cena5 = new Phaser.Scene("Cena 5");

cena5.preload = function () {
  this.load.image("fim", "./assets/fim.png");
};

cena5.create = function () {
  var button = this.add.image(500, 325, "fim", 0).setInteractive();

  button.on(
    "pointerdown",
    function () {
      location.reload();
    },
    this
  );
};

cena5.update = function () {};

export { cena5 };
