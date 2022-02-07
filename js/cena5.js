import { cena1 } from "./cena1.js";

var cena2 = new Phaser.Scene("Cena 2");

cena2.preload = function () {
  this.load.image("fim", "assets/fim.png");
};

cena2.create = function () {
  var button = this.add.image(500, 325, "fim", 0).setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena1);
    },
    this
  );
};

cena2.update = function () {};

export { cena5 };
