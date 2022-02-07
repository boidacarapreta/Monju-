
var config = {

    /// Configurações do tamanho da tela
    type: Phaser.AUTO,
    width: 1000,
    height: 650,
    
    physics: {
        default: 'arcade',
        arcade: {

            /// Valor da Gravidade
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'assets/fundo.png');
    this.load.image('ground', 'assets/meio.png');
    this.load.image('escada','assets/escada.png');
    this.load.image('escadav','assets/escadav.png');
    this.load.image('button', 'assets/button.png');
    this.load.image('spikes', 'assets/spykes.png');
    this.load.image('spikeb', 'assets/spykesb.png');
    this.load.image('spiked', 'assets/spykesd.png');
    this.load.image('spikese', 'assets/spykese.png');
    this.load.image('spikesc', 'assets/spykesc.png');
    this.load.image('spikesl', 'assets/spykesl.png');
    this.load.spritesheet('alienvd', 'assets/alienvd.png', { frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('alienve', "assets/alienve.png",{frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('alienrd', 'assets/alienrd.png', { frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('alienre', "assets/alienre.png",{frameWidth: 32, frameHeight: 48});

    this.load.image('restart', 'assets/restart.png');
    /// Colocar o sprite sheet em uma imagem completa. 

}


function create ()
{
    //  A simple background for our game
    this.add.image(500, 325, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    spikes = this.physics.add.staticGroup();

    platforms.create(500, 325, 'ground').setScale(1.2).refreshBody();
    platforms.create(500, 672, 'ground').setScale(1.2).refreshBody();
    
    platforms.create(170,270, 'escada').refreshBody() && platforms.create(170,620, 'escada').refreshBody();
    
    platforms.create(255,270, 'escada').refreshBody() && platforms.create(255,620, 'escada').refreshBody();

    platforms.create(255,223, 'escada').refreshBody() && platforms.create(255,573, 'escada').refreshBody();

    platforms.create(500,147, 'escada').setScale(0.75).refreshBody() && platforms.create(420,500, 'escada').setScale(0.70).refreshBody() &&  platforms.create(550,500, 'escada').setScale(0.70).refreshBody();

    platforms.create(700,251, 'escadav').setScale(1).refreshBody() && platforms.create(700,600, 'escadav').setScale(1).refreshBody();

    //Espinhos
    spikes.create(500,185,'spikes').setScale(0.28).refreshBody() && spikes.create(500,528,'spikes').setScale(0.28).refreshBody();

    // The player and its settings
    player = this.physics.add.sprite(100, 130, 'alienvd', 'alienve');
    player2 = this.physics.add.sprite(100, 530, 'alienrd', 'alienre');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
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

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    up = this.input.keyboard.addKey("W");
    down = this.input.keyboard.addKey("S"); 
    left = this.input.keyboard.addKey("A");
    right = this.input.keyboard.addKey("D");

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player, spikes, hitSpike, null, this);
    this.physics.add.collider(player2, spikes, hitSpike, null, this);
    
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
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
        player.setVelocityX(-200);
        player.anims.play('left', true);
        player2.setVelocityX(-200);
        player2.anims.play('left2', true);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(190);
        player.anims.play('right', true);
        player2.setVelocityX(160);
        player2.anims.play('right2', true);

    }
   
    else
    {
        player.setVelocityX(0);
        player.anims.play('right');
        player2.setVelocityX(0);
        player2.anims.play('right2');

    }

    if (up.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-200);
        player.setVelocityY(-240);

    };

   
}

function hitSpike (player, spikes)
{
    gameOver = true;

}
