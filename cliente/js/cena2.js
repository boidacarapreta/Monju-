import { cena3 } from "./cena3.js";
var cena2 = new Phaser.Scene("Cena 2");

var player;
var player2;
var che1 = false;
var che2 = false;
var chegada;
var cursors;
var death;
var teclaf;
var ativar = false;
var up;
var down;
var left;
var right;
var button;
var spikes;
var platforms;
var escada;
var gameOver = false;

cena2.preload = function () {
  this.load.audio("death", "./assets/death.mp3");
  this.load.image("background", "./assets/fundo.png");
  this.load.image("ground", "./assets/meio.png");
  this.load.image("spike", "./assets/spykes.png");
  this.load.image("escada", "./assets/escada.png");
  this.load.image("chegada", "./assets/chegada.png");
  this.load.spritesheet("alienvd", "./assets/alienvd.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("alienve", "./assets/alienve.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("alienrd", "./assets/alienrd.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("alienre", "./assets/alienre.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("button", "./assets/button.png", {
    frameWidth: 36,
    frameHeight: 18,
  });
  this.load.audio("death", "./assets/death.mp3");
};

cena2.create = function () {
  this.add.image(500, 325, "background");
  death = this.sound.add("death");

  platforms = this.physics.add.staticGroup();
  spikes = this.physics.add.staticGroup();
  chegada = this.physics.add.staticGroup();
  escada = this.physics.add.staticGroup();

  platforms.create(500, 325, "ground").setScale(1.2).refreshBody();
  platforms.create(500, 672, "ground").setScale(1.2).refreshBody();

  //cima
  spikes.create(400, 285, "spike").setScale(0.2).refreshBody() &&
    spikes.create(650, 285, "spike").setScale(0.2).refreshBody();

  escada.create(30, 198, "escada").setScale(0.5).refreshBody() &&
    escada.create(260, 98, "escada").setScale(0.5).refreshBody() &&
    escada.create(480, 198, "escada").setScale(0.5).refreshBody() &&
    escada.create(730, 120, "escada").setScale(0.5).refreshBody();

  //baixo
  spikes.create(400, 633, "spike").setScale(0.2).refreshBody() &&
    spikes.create(650, 633, "spike").setScale(0.2).refreshBody();

  escada.create(30, 544, "escada").setScale(0.5).refreshBody() &&
    escada.create(260, 446, "escada").setScale(0.5).refreshBody() &&
    escada.create(480, 546, "escada").setScale(0.5).refreshBody() &&
    escada.create(730, 468, "escada").setScale(0.5).refreshBody();

  chegada.create(940, 269, "chegada");
  chegada.create(940, 615, "chegada");

  player = this.physics.add.sprite(100, 130, "alienvd", "alienve");
  player2 = this.physics.add.sprite(100, 530, "alienrd", "alienre");
  ///button = this.physics.add.staticSprite(500, 285, "button");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player2.setBounce(0.2);
  player2.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("alienve", { start: 0, end: 8 }),
    frameRate: 100,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("alienvd", { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "left2",
    frames: this.anims.generateFrameNumbers("alienre", { start: 0, end: 8 }),
    frameRate: 100,
    repeat: -1,
  });

  this.anims.create({
    key: "right2",
    frames: this.anims.generateFrameNumbers("alienrd", { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "on",
    frames: this.anims.generateFrameNumbers("button", { start: 0, end: 2 }),
    frameRate: 60,
    //repeat:
  });

  this.anims.create({
    key: "off",
    frames: this.anims.generateFrameNumbers("button", { start: 0, end: 0 }),
    frameRate: 60,
    //repeat:
  });

  cursors = this.input.keyboard.createCursorKeys();
  up = this.input.keyboard.addKey("W");
  down = this.input.keyboard.addKey("S");
  left = this.input.keyboard.addKey("A");
  right = this.input.keyboard.addKey("D");
  teclaf = this.input.keyboard.addKey("F");

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player2, platforms);
  this.physics.add.collider(player, escada);
  this.physics.add.collider(player2, escada);
  this.physics.add.collider(player, spikes, hitSpike, null, this);
  this.physics.add.collider(player2, spikes, hitSpike, null, this);
  this.physics.add.collider(player, button, hitButton, null, this);
  this.physics.add.overlap(player, chegada, hitChegada, null, this);
  this.physics.add.overlap(player2, chegada, hitChegada2, null, this);
};

cena2.update = function () {
  if (gameOver) {
    restart.call(this);
    /*this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play(right);
    player2.setTint(0xff0000);
    player2.anims.play("right2");
    //return; // trava tudo, slk*/
  }

  ///Setas
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("right");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-260);
  }

  /// WASD
  if (left.isDown) {
    player2.setVelocityX(-160);
    player2.anims.play("left2", true);
  } else if (right.isDown) {
    player2.setVelocityX(160);
    player2.anims.play("right2", true);
  } else {
    player2.setVelocityX(0);
    player2.anims.play("right2");
  }

  if (up.isDown && player2.body.touching.down) {
    player2.setVelocityY(-260);
  }

  if (che1 == true && che2 == true) {
    this.scene.start(cena3);
  }
};

function hitSpike(player, spikes) {
  this.physics.pause();
  death.play();

  player.setTint(0xff0000);
  player.anims.play(right);
  player2.setTint(0xff0000);
  player2.anims.play("right2");
  gameOver = true;
}

function hitButton(player, button) {
  if (teclaf.isDown && ativar == false) {
    button.anims.play("on");
    ativar = true;
  } else if (teclaf.isDown && ativar == true) {
    button.anims.play("off");
    ativar = false;
    platforms.create(500, 100, "ground").setScale(1.2).refreshBody();
  }
}

function hitChegada(player, chegada) {
  che1 = true;
}

function hitChegada2(player2, chegada) {
  che2 = true;
}

function restart() {
  this.input.on("pointerdown", () => this.scene.start("Cena 2"));
  //this.input.on("pointerdown", () => this.scene.restart());
}

export { cena2 };
