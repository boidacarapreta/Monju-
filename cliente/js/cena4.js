import { cena5 } from "./cena5.js";
var cena4 = new Phaser.Scene("Cena 4");

var player1;
var player2;
var che1 = false;
var che2 = false;
var chegada;
var cursors;
var death;
//var teclaf;
//var ativar = false;
var up;
var down;
var left;
var right;
//var button;
var spikes;
var platforms;
var gameOver = false;
var k1 = false;
var k2 = false;
var key;
var key2;
var jogador;
var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

cena4.preload = function () {
  this.load.image("background", "./assets/fundo.png");
  this.load.image("ground", "./assets/meio.png");
  this.load.image("button", "./assets/button.png");
  this.load.image("spikeb", "./assets/spykesb.png");
  this.load.image("spiked", "./assets/spykesd.png");
  this.load.image("spikese", "./assets/spykese.png");
  this.load.image("spikesc", "./assets/spykesc.png");
  this.load.image("spikesl", "./assets/spykesl.png");
  this.load.image("chegada", "./assets/chegada.png");
  this.load.image("key", "./assets/key.png");
  this.load.spritesheet("alien-verde", "./assets/alien-verde.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("alien-rosa", "./assets/alien-rosa.png", {
    frameWidth: 32,
    frameHeight: 48,
  });

  this.load.audio("death", "./assets/death.mp3");

  this.load.image("restart", "./assets/restart.png");
};

cena4.create = function () {
  this.add.image(500, 325, "background");
  death = this.sound.add("death");

  platforms = this.physics.add.staticGroup();
  spikes = this.physics.add.staticGroup();
  chegada = this.physics.add.staticGroup();
  key = this.physics.add.staticGroup();
  key2 = this.physics.add.staticGroup();

  platforms.create(500, 325, "ground").setScale(1.2).refreshBody();
  platforms.create(500, 672, "ground").setScale(1.2).refreshBody();

  ///Cima 1
  spikes.create(100, 10, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(270, 10, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(470, 10, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(680, 10, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(888, 10, "spikeb").setScale(0.2).refreshBody();
  ///Cima 2
  spikes.create(100, 360, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(270, 360, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(470, 360, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(680, 360, "spikeb").setScale(0.2).refreshBody() &&
    spikes.create(888, 360, "spikeb").setScale(0.2).refreshBody();
  //Laterais 1
  spikes.create(9, 110, "spiked").setScale(0.2).refreshBody();
  spikes.create(989.9, 110, "spikese").setScale(0.2).refreshBody();
  //Laterais 2
  spikes.create(9, 460, "spiked").setScale(0.2).refreshBody();
  spikes.create(989.9, 460, "spikese").setScale(0.2).refreshBody();
  //Meio 1
  spikes.create(200, 230, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(390, 230, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(580, 230, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(770, 230, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(800, 230, "spikesl").setScale(0.24).refreshBody();
  //Meio 2
  spikes.create(200, 575, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(390, 575, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(580, 575, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(770, 575, "spikesl").setScale(0.24).refreshBody() &&
    spikes.create(800, 575, "spikesl").setScale(0.24).refreshBody();
  //Colunas 1
  spikes.create(300, 45, "spikesc").setScale(0.22).refreshBody() &&
    spikes.create(300, 95, "spikesc").setScale(0.22).refreshBody() &&
    spikes.create(750, 45, "spikesc").setScale(0.22).refreshBody() &&
    spikes.create(750, 95, "spikesc").setScale(0.22).refreshBody();
  //Colunas 2
  spikes.create(300, 395, "spikesc").setScale(0.22).refreshBody() &&
    spikes.create(300, 440, "spikesc").setScale(0.22).refreshBody() &&
    spikes.create(750, 395, "spikesc").setScale(0.22).refreshBody() &&
    spikes.create(750, 440, "spikesc").setScale(0.22).refreshBody();

  key.create(940, 200, "key");
  key2.create(940, 550, "key");

  chegada.create(940, 269, "chegada").refreshBody();
  chegada.create(940, 615, "chegada").refreshBody();

  player1 = this.physics.add.sprite(100, 130, "alien-verde");
  player2 = this.physics.add.sprite(100, 530, "alien-rosa");

  player1.body.setAllowGravity(false);
  player2.body.setAllowGravity(false);

  button = this.physics.add.staticSprite(490, 285, "button");

  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("alien-verde", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("alien-verde", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("alien-verde", {
      start: 16,
      end: 17,
    }),
    frameRate: 2,
    repeat: -1,
  });

  this.anims.create({
    key: "left2",
    frames: this.anims.generateFrameNumbers("alien-rosa", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right2",
    frames: this.anims.generateFrameNumbers("alien-rosa", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped2",
    frames: this.anims.generateFrameNumbers("alien-rosa", {
      start: 16,
      end: 17,
    }),
    frameRate: 2,
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

  this.socket = io();

  // Disparar evento quando jogador entrar na partida
  var self = this;
  var physics = this.physics;
  var socket = this.socket;

  this.socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === self.socket.id) {
      jogador = 1;
      player1.body.setAllowGravity(true);
      player1.body.setGravityY(300);
      player1.setBounce(0.2);
      player1.setCollideWorldBounds(true);
      physics.add.collider(player1, platforms, null, null, this);
      physics.add.collider(player1, spikes, hitSpike, null, this);
      physics.add.collider(player1, button, hitButton, null, this);
      physics.add.overlap(player1, chegada, hitChegada, null, this);

      // navigator.mediaDevices
      //   .getUserMedia({ video: false, audio: true })
      //   .then((stream) => {
      //     midias = stream;
      //   })
      //   .catch((error) => console.log(error));
    } else if (jogadores.segundo === self.socket.id) {
      jogador = 2;
      player2.body.setAllowGravity(true);
      player2.body.setGravityY(300);
      player2.setBounce(0.2);
      player2.setCollideWorldBounds(true);
      physics.add.collider(player2, platforms, null, null, this);
      physics.add.collider(player2, spikes, hitSpike, null, this);
      physics.add.collider(player2, button, hitButton, null, this);
      physics.add.overlap(player2, chegada, hitChegada, null, this);

      // navigator.mediaDevices
      //   .getUserMedia({ video: false, audio: true })
      //   .then((stream) => {
      //     midias = stream;
      //     localConnection = new RTCPeerConnection(ice_servers);
      //     midias
      //       .getTracks()
      //       .forEach((track) => localConnection.addTrack(track, midias));
      //     localConnection.onicecandidate = ({ candidate }) => {
      //       candidate &&
      //         socket.emit("candidate", jogadores.primeiro, candidate);
      //     };
      //     console.log(midias);
      //     localConnection.ontrack = ({ streams: [midias] }) => {
      //       audio.srcObject = midias;
      //     };
      //     localConnection
      //       .createOffer()
      //       .then((offer) => localConnection.setLocalDescription(offer))
      //       .then(() => {
      //         socket.emit(
      //           "offer",
      //           jogadores.primeiro,
      //           localConnection.localDescription
      //         );
      //       });
      //   })
      //   .catch((error) => console.log(error));
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
  });

  this.socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", socketId, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", socketId, remoteConnection.localDescription);
      });
  });

  this.socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  this.socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  this.socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x;
      player2.y = y;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x;
      player1.y = y;
    }
  });
};

cena1.update = function () {
  if (gameOver) {
    restart.call(this);
  }

  if (jogador === 1) {
    if (cursors.left.isDown) {
      player1.body.setVelocityX(-160);
      player1.anims.play("left1", true);
    } else if (cursors.right.isDown) {
      player1.body.setVelocityX(160);
      player1.anims.play("right1", true);
    } else {
      player1.body.setVelocityX(0);
      player1.anims.play("stopped1", true);
    }
    if (cursors.up.isDown && player1.body.blocked.down) {
      player1.body.setVelocityY(-400);
    }
    this.socket.emit("estadoDoJogador", {
      frame: player1.anims.getFrameName(),
      x: player1.body.x + 16,
      y: player1.body.y + 24,
    });
  } else if (jogador === 2) {
    if (cursors.left.isDown) {
      player2.body.setVelocityX(-160);
      player2.anims.play("left2", true);
    } else if (cursors.right.isDown) {
      player2.body.setVelocityX(160);
      player2.anims.play("right2", true);
    } else {
      player2.body.setVelocityX(0);
      player2.anims.play("stopped2", true);
    }
    if (cursors.up.isDown && player2.body.blocked.down) {
      player2.body.setVelocityY(-400);
    }
    this.socket.emit("estadoDoJogador", {
      frame: player2.anims.getFrameName(),
      x: player2.body.x + 16,
      y: player2.body.y + 24,
    });
  }

  if (che1 == true && che2 == true) {
    this.scene.start(cena2);
  }
};

function hitKey(player, key) {
  this.add.image(500, 325, "key");
  key.disableBody(true, true);
  k1 = true;
}

function hitKey2(player2, key2) {
  this.add.image(250, 325, "key");
  key2.disableBody(true, true);
  k2 = true;
}

function hitSpike(player, spikes) {
  this.physics.pause();
  death.play();

  player.setTint(0xff0000);
  player.anims.play(right);
  player2.setTint(0xff0000);
  player2.anims.play("right2");
  gameOver = true;
}

function hitChegada(player, chegada) {
  che1 = true;
}

function hitChegada2(player2, chegada) {
  che2 = true;
}

function restart() {
  this.input.on("pointerdown", () => this.scene.start("Cena 4"));
  //this.input.on("pointerdown", () => this.scene.restart());
}

export { cena4 };
