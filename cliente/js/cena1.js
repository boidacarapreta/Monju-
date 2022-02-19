import { cena5 } from "./cena5.js";
var cena1 = new Phaser.Scene("Cena 1");

var player1;
var player2;
var che1 = false;
var che2 = false;
var criarChegada;
var chegada;
var escada;
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
var gameOver = false;
var jogador;
var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

cena1.preload = function () {
  this.load.image("background", "./assets/fundo.png");
  this.load.image("ground", "./assets/meio.png");
  this.load.image("spike", "./assets/spykes.png");
  this.load.image("chegada", "./assets/chegada.png");
  this.load.image("escada", "./assets/escada.png");

  this.load.spritesheet("alien-verde", "./assets/alien-verde.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("alien-rosa", "./assets/alien-rosa.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("button", "./assets/button.png", {
    frameWidth: 36,
    frameHeight: 18,
  });
  this.load.audio("death", "./assets/death.mp3");
};

cena1.create = function () {
  criarChegada = false;
  this.add.image(500, 325, "background");

  death = this.sound.add("death");
  platforms = this.physics.add.staticGroup();
  spikes = this.physics.add.staticGroup();
  chegada = this.physics.add.staticGroup();
  escada = this.physics.add.staticGroup();

  platforms.create(500, 325, "ground").setScale(1.2).refreshBody();
  platforms.create(500, 672, "ground").setScale(1.2).refreshBody();
  spikes.create(700, 280, "spike").setScale(0.3).refreshBody();
  spikes.create(700, 630, "spike").setScale(0.3).refreshBody();

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
      physics.add.collider(player1, escada, null, null, this);
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
      physics.add.collider(player2, escada, null, null, this);
      physics.add.collider(player2, spikes, hitSpike, null, this);
      physics.add.collider(player2, button, hitButton, null, this);
      physics.add.overlap(player2, chegada, hitChegada2, null, this);

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

  this.socket.on("criarChegada", ({ criarChegada }) => {
    if (criarChegada) {
      button.anims.play("on");
      ativar = true;

      escada.create(600, 550, "escada").setScale(0.8).refreshBody();
      escada.create(780, 500, "escada").setScale(0.8).refreshBody();
      escada.create(940, 433, "escada").setScale(0.8).refreshBody();

      escada.create(600, 200, "escada").setScale(0.8).refreshBody();
      escada.create(780, 150, "escada").setScale(0.8).refreshBody();
      escada.create(940, 87, "escada").setScale(0.8).refreshBody();

      chegada.create(940, 269, "chegada").refreshBody();
      chegada.create(940, 609, "chegada").refreshBody();
    }
  });

  this.socket.on("chegada", ({ che1remoto, che2remoto }) => {
    che1 = che1 || che1remoto;
    che2 = che2 || che2remoto;
  });
};

cena1.update = function () {
  if (gameOver) {
    this.physics.pause();
    death.play();

    player1.setTint(0xff0000);
    player1.anims.play(right);
    player2.setTint(0xff0000);
    player2.anims.play("right2");
    //restart.call(this);
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

  if (criarChegada === true) {
    this.socket.emit("criarChegada", {
      criarChegada: true,
    });
  }

  this.socket.emit("chegada", {
    che1remoto: che1,
    che2remoto: che2,
  });

  if (che1 == true && che2 == true) {
    this.scene.start(cena5);
  }
};

function hitSpike(player1, spikes) {
  gameOver = true;
}

function hitButton(player, button) {
  if (teclaf.isDown && ativar == false) {
    button.anims.play("on");
    ativar = true;

    escada.create(600, 550, "escada").setScale(0.8).refreshBody();
    escada.create(780, 500, "escada").setScale(0.8).refreshBody();
    escada.create(940, 433, "escada").setScale(0.8).refreshBody();

    escada.create(600, 200, "escada").setScale(0.8).refreshBody();
    escada.create(780, 150, "escada").setScale(0.8).refreshBody();
    escada.create(940, 87, "escada").setScale(0.8).refreshBody();

    chegada.create(940, 39, "chegada").refreshBody();
    chegada.create(940, 385, "chegada").refreshBody();
    criarChegada = true;
  }
}

function hitChegada(player1, chegada) {
  che1 = true;
}

function hitChegada2(player2, chegada) {
  che2 = true;
}

function restart() {
  //this.input.on("pointerdown", () => this.scene.start("Cena 1"));
  //this.input.on("pointerdown", () => this.scene.restart());
}

export { cena1 };
