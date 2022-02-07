import { cena5 } from "./cena5.js";
var cena4 = new Phaser.Scene("Cena 4");

var player;
var player2;
var up;
var down;
var left;
var right;
var button;
var spyke;
var platforms;
var gameOver = false;
var k1 = false;
var k2 = false;

function preload ()
{
    this.load.image('background', 'assets/fundo.png');
    this.load.image('ground', 'assets/meio.png');
    this.load.image('button', 'assets/button.png');
    this.load.image('spikeb', 'assets/spykesb.png');
    this.load.image('spiked', 'assets/spykesd.png');
    this.load.image('spikese', 'assets/spykese.png');
    this.load.image('spikesc', 'assets/spykesc.png');
    this.load.image('spikesl', 'assets/spykesl.png');
    this.load.image('key', 'assets/key.png');
    this.load.spritesheet('alienvd', 'assets/alienvd.png', { frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('alienve', "assets/alienve.png",{frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('alienrd', 'assets/alienrd.png', { frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('alienre', "assets/alienre.png",{frameWidth: 32, frameHeight: 48});

    this.load.image('restart', 'assets/restart.png'); 

}


function create ()
{
    this.add.image(500, 325, 'background');
    platforms = this.physics.add.staticGroup();
    spikes = this.physics.add.staticGroup();
    key = this.physics.add.staticGroup();
    key2 = this.physics.add.staticGroup();

    platforms.create(500, 325, 'ground').setScale(1.2).refreshBody();
    platforms.create(500, 672, 'ground').setScale(1.2).refreshBody();
    
    ///Cima 1
    spikes.create(100,10,'spikeb').setScale(0.2).refreshBody() && spikes.create(270,10,'spikeb').setScale(0.2).refreshBody() && spikes.create(470,10,'spikeb').setScale(0.2).refreshBody() && spikes.create(680,10,'spikeb').setScale(0.2).refreshBody() && spikes.create(888,10,'spikeb').setScale(0.2).refreshBody();
    ///Cima 2
    spikes.create(100,360,'spikeb').setScale(0.2).refreshBody() && spikes.create(270,360,'spikeb').setScale(0.2).refreshBody() && spikes.create(470,360,'spikeb').setScale(0.2).refreshBody() && spikes.create(680,360,'spikeb').setScale(0.2).refreshBody() && spikes.create(888,360,'spikeb').setScale(0.2).refreshBody();
    //Laterais 1
    spikes.create(09,110,'spiked').setScale(0.2).refreshBody();
    spikes.create(989.9,110,'spikese').setScale(0.2).refreshBody();
    //Laterais 2
    spikes.create(09,460,'spiked').setScale(0.2).refreshBody();
    spikes.create(989.9,460,'spikese').setScale(0.2).refreshBody();
    //Meio 1
    spikes.create(200,230,'spikesl').setScale(0.24).refreshBody() && spikes.create(390,230,'spikesl').setScale(0.24).refreshBody() && spikes.create(580,230,'spikesl').setScale(0.24).refreshBody() && spikes.create(770,230,'spikesl').setScale(0.24).refreshBody() && spikes.create(800,230,'spikesl').setScale(0.24).refreshBody();
    //Meio 2
    spikes.create(200,575,'spikesl').setScale(0.24).refreshBody() && spikes.create(390,575,'spikesl').setScale(0.24).refreshBody() && spikes.create(580,575,'spikesl').setScale(0.24).refreshBody() && spikes.create(770,575,'spikesl').setScale(0.24).refreshBody() && spikes.create(800,575,'spikesl').setScale(0.24).refreshBody();
    //Colunas 1
    spikes.create(300,45,'spikesc').setScale(0.22).refreshBody() && spikes.create(300,95,'spikesc').setScale(0.22).refreshBody() && spikes.create(750,45,'spikesc').setScale(0.22).refreshBody() && spikes.create(750,95,'spikesc').setScale(0.22).refreshBody();
    //Colunas 2
    spikes.create(300,395,'spikesc').setScale(0.22).refreshBody() && spikes.create(300,440,'spikesc').setScale(0.22).refreshBody() && spikes.create(750,395,'spikesc').setScale(0.22).refreshBody() && spikes.create(750,440,'spikesc').setScale(0.22).refreshBody();

    key.create(35,200, 'key');
    key2.create(35,550, 'key');

    player = this.physics.add.sprite(35, 265, 'alienvd', 'alienve');
    player2 = this.physics.add.sprite(35, 610, 'alienrd', 'alienre');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('alienve', { start: 0, end: 8 }),
        frameRate: 100,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('alienvd', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('alienre', { start: 0, end: 8 }),
        frameRate: 100,
        repeat: -1
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('alienrd', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    up = this.input.keyboard.addKey("W");
    down = this.input.keyboard.addKey("S"); 
    left = this.input.keyboard.addKey("A");
    right = this.input.keyboard.addKey("D");

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player, spikes, hitSpike, null, this);
    this.physics.add.collider(player2, spikes, hitSpike, null, this);
    this.physics.add.overlap(player, key, hitKey, null, this);
    this.physics.add.overlap(player2, key2, hitKey2, null, this);
}

function update ()
{
    if (gameOver)
    {
    this.physics.pause();

    player.setTint(0xff0000);
    player.anims.play(right);
    player2.setTint(0xff0000);
    player2.anims.play('right2');

    return;
    
    }


    ///Setas
    if (cursors.left.isDown)
    {
        player.setVelocityX(-10);
        player.anims.play('left', true);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(10);
        player.anims.play('right', true);

    }
   
    else
    {
        player.setVelocityX(0);
        player.anims.play('right');

    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-60);

    }

    if (cursors.up.isDown && cursors.right.isDown)
    {
        player.setVelocityY(-60);
        player.setVelocityX(300);

    }

    /// WASD
    if (left.isDown)
    {
        player2.setVelocityX(-10);
        player2.anims.play('left2', true);

    }
    else if (right.isDown)
    {
        player2.setVelocityX(10);
        player2.anims.play('right2', true);

    }
   
    else
    {
        player2.setVelocityX(0);
        player2.anims.play('right2');

    }

    if (up.isDown)
    {
        player2.setVelocityY(-60);

    }
    
    if (up.isDown && right.isDown)
    {
        player2.setVelocityY(-60);
        player2.setVelocityX(300);

    }

    //Habilitar passar de fase Porraaaaaaa
    if (k1 == true && k2 == true){gameOver = true;}
   
}

function hitKey (player, key)
{
    this.add.image (500,325, 'key');
    key.disableBody(true, true);
    k1 = true;
}

function hitKey2 (player2, key2)
{
    this.add.image (250,325, 'key');
    key2.disableBody(true, true);
    k2 = true;
    
}

function hitSpike (player, spikes)
{
    gameOver = true;

}

export { cena4 };