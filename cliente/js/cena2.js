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
var jogador;
var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

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

  
  this.socket = io();

  // Disparar evento quando jogador entrar na partida
  var self = this;
  var physics = this.physics;
  var socket = this.socket;

  this.socket.on("jogadores", function (jogadores) {

    if (jogadores.primeiro === self.socket.id) {
      jogador = 1;
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      physics.add.collider(player, platforms);
      physics.add.collider(player, spikes, hitSpike, null, this);
      physics.add.collider(player, button, hitButton, null, this);
      physics.add.overlap(player, chegada, hitChegada, null, this);
      this.physics.add.collider(player, escada);

      //cameras.main.startFollow(player1);

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
    } else if (jogadores.segundo === self.socket.id) {
      jogador = 2;
      player2.setBounce(0.2);
      player2.setCollideWorldBounds(true);
      physics.add.collider(player2, platforms);
      physics.add.collider(player2, spikes, hitSpike, null, this);
      physics.add.collider(player2, escada);
      physics.add.overlap(player2, chegada, hitChegada2, null, this);

      //cameras.main.startFollow(player2);

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              socket.emit("candidate", jogadores.primeiro, candidate);
          };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit(
                "offer",
                jogadores.primeiro,
                localConnection.localDescription
              );
            });
        })
        .catch((error) => console.log(error));
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

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Desenhar o outro jogador
  this.socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x;
      player2.y = y;
    } else if (jogador === 2) {
      player.setFrame(frame);
      player.x = x;
      player.y = y;
    }
  });
};
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

  if (jogador === 1) {
    if (cursors.left.isDown) {
      player.body.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(160);
      player.anims.play("right", true);
    } else {
      player.body.setVelocityX(0);
      player.anims.play("right", true);
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.setVelocityY(-260);
    } else {
      player.body.setVelocityY(0);
    }
    this.socket.emit("estadoDoJogador", {
      frame: player.anims.currentFrame.index,
      x: player.body.x,
      y: player.body.y,
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
      player2.anims.play("right2", true);
    }
    if (cursors.up.isDown && player2.body.touching.down) {
      player2.body.setVelocityY(-260);
    } else {
      player2.body.setVelocityY(0);
    }

    this.socket.emit("estadoDoJogador", {
      frame: player2.anims.currentFrame.index,
      x: player2.body.x,
      y: player2.body.y,
    });
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
