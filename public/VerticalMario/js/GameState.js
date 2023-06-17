var VerticalMario = VerticalMario || {};

VerticalMario.GameState = {
  create: function(){
    this.background = this.game.add.sprite(0,0, 'background');
    this.player = this.game.add.group();

    var mario = new VerticalMario.Mario(this.game, 70, 200);

    this.player.add(mario);
    this.alreadDead = false;

    this.mainTheme = this.game.add.audio('mainTheme');
    this.coinSound = this.game.add.audio('getCoin');
    this.deadSound = this.game.add.audio('dead');
    this.hitHeadSound = this.game.add.audio('hitHead');
    this.squishEnemySound = this.game.add.audio('squishEnemy');
    this.shellHitSound = this.game.add.audio('shell_hit');
    this.mainTheme.play();

    this.createInitialPlatform();
    this.createGoombas();
    this.createCoins();
    // this.createKoopas();
    this.score = 0;

    //enemy timers////////////
    this.rowTimer = this.game.time.events.loop(7000, this.addRow, this);
    this.goombaTimer = this.game.time.events.loop(2000, this.addGoomba, this);
    //this.koopaTimer = this.game.time.events.loop(10000, this.addKoopa, this);
    ////////////////////////

    this.game.scoreBoard = this.game.add.bitmapText(10, 10, "marioFont", "SCORE: 0" , 16);
  },

  update: function(){
   if(this.player.alive){
        this.game.physics.arcade.collide(this.player, this.initPlatforms, this.brickCollision, null, this);
        this.game.physics.arcade.collide(this.player, this.badGuys, this.playerCollision, null, this);
        // this.game.physics.arcade.collide(this.player, this.shellEnemies, this.playerCollision, null, this);
        // this.game.physics.arcade.collide(this.shellEnemies, this.badGuys, this.shellCollision, null, this);
        // this.game.physics.arcade.collide(this.shellEnemies, this.shellEnemies, this.shellCollision, null, this);
        this.game.physics.arcade.overlap(this.coins, this.player, this.collectCoin, null, this);
      }
  this.game.physics.arcade.collide(this.shellEnemies, this.initPlatforms, this.realignBadGuy, null, this);
  this.game.physics.arcade.collide(this.badGuys, this.initPlatforms, this.realignBadGuy, null, this);
  this.game.physics.arcade.collide(this.coins, this.initPlatforms, this.fixCoins, null, this);

    if(!this.player.alive){
      this.restartTimer = this.game.time.events.loop(3000, this.gameOver, this);
    }
    this.initPlatforms.update();
    this.coins.update();

    if(this.player.children[0].body.y >= 500){
       this.mainTheme.stop();
       if(!this.alreadyDead){
         this.deadSound.play();
         this.game.state.start('InputState');
         this.game.time.events.add(Phaser.Timer.SECOND * 2000, this.gameOver, this);
       }
       this.alreadyDead == true;
      }
  },


  shellCollision:function(shellEnemy, badGuy){
   
    if(shellEnemy.animations.currentAnim.name == 'shell'){
       
        badGuy.hit = false;
        this.flipBadGuy(shellEnemy, badGuy);
        this.shellHitSound.play();
        this.pointsUp = this.game.add.image(badGuy.body.x, badGuy.body.y - 20, '200pts');
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.killPointSprite, this, this.pointsUp);
        this.score += 500;
        this.game.scoreBoard.setText("SCORE: " +  this.score);
      }else{
        shellEnemy.body.velocity.x *= -1;
        badGuy.body.velocity.x *= -1;
      }
  },
  
  createInitialPlatform: function(){
    this.initPlatforms = this.game.add.group();
    for(var y = -2; y < 5; y ++){
      var gap = Math.floor(Math.random()*20);
      for(var x = 0; x < 24; x++){
         if(x <= gap || x >= gap + 5){
          var platform = new VerticalMario.InitPlatforms(this, 32*x,150*y);
         }
        this.initPlatforms.add(platform);
      }
    }
  },

  addRow: function(){
    var gap = Math.floor(Math.random()*20);
    for(var x = 0; x < 24; x++){
      if(x <= gap || x >= gap + 5){
        var platform = new VerticalMario.InitPlatforms(this, 32*x,-330);
      }
      this.initPlatforms.add(platform);
    }
  },

  createKoopas: function(){
      this.shellEnemies = this.game.add.group();
      var koopa = new VerticalMario.Koopa(this.game, 250, 100);
      this.shellEnemies.add(koopa);
  },
  createSpiny: function(){
    this.badGuys = this.game.add.group();
    var spiny = new VerticalMario.Spiny(this.game, 450, 200);
    this.badGuys.add(spiny);
  },
  createGoombas:function(){
    this.badGuys = this.game.add.group();
    this.badGuys.enableBody = true;
    var goomba = new VerticalMario.Goomba(this.game, this.randomPlacement(), 20);
    this.badGuys.add(goomba);
  },

  addGoomba: function(){
    var goomba = new VerticalMario.Goomba(this.game, this.randomPlacement(), -100);
    this.badGuys.add(goomba);
  },

  addSpiny: function(){
    var spiny = new VerticalMario.Spiny(this.game, this.randomPlacement(),-100);
    this.badGuys.add(spiny);
  },

  addKoopa: function(){
    var direction = Math.random();
    var koopa = new VerticalMario.Koopa(this.game, this.randomPlacement(), -110, direction);
    this.shellEnemies.add(koopa);
  },

  createCoins: function(){
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
    for(var x = 0; x<3; x++){
      var ranX = Math.floor(Math.random() * 650);
      var ranY = Math.floor(Math.random()* 350);
      var coin = new VerticalMario.Coin(this.game, ranX, ranY);
      this.coins.add(coin);
    }
  },

  fixCoins: function(coin, platform){
    coin.y += 20;
  },

  collectCoin: function(coin, player){
    coin.relocate();
    this.coinSound.play();
    this.score += 200;
    player.score += 200;
    this.game.scoreBoard.setText("SCORE: " +  this.score );
  },

  playerCollision: function(player, badGuy){
    //badGuy get hit
    if(badGuy.body.touching.up && badGuy.key != 'spiny'){
        if(badGuy.key == 'koopa'){
            if(badGuy.flying){
            
              this.squishEnemySound.play();
              badGuy.flying = false;
              badGuy.body.velocity.y = 120;
              player.body.velocity.y = -75;
            }else if(!badGuy.flying){
              this.shellHitSound.play();
              player.body.velocity.y = -125;
              badGuy.shell = true
                if(player.body.velocity.x >= 0){
                
                  badGuy.body.velocity.x = 300;
                }else if (player.body.velocity.x <= 0){
                 
                  badGuy.body.velocity.x = -300;
                }
            }
        }else{
          if(badGuy.dead == false){
            this.squishEnemySound.play();
            badGuy.animations.play('dead');
            badGuy.dead = true;
            badGuy.body.velocity.x = 0;
            this.pointsUp = this.game.add.image(badGuy.body.x, badGuy.body.y - 10, '200pts');
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.killPointSprite, this, this.pointsUp);
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.killSprite, this, badGuy);
            player.body.velocity.y = -300;
            this.score += 200;
            player.score += 200;
            this.game.scoreBoard.setText("SCORE: " +  this.score);
          }
        }
      }else{
        //the player gets hit
        this.mainTheme.stop();
        this.deadSound.play();
        this.alreadyDead = true;
        player.dead = true;
        player.animations.play('dead');
        player.body.velocity.x = 0;
        player.body.velocity.y = -350;
        this.player.alive = false;
      }  
  },

  brickCollision: function(player, brick){
    if(brick.body.touching.down){
      this.hitHeadSound.play();
      var brickBounce = this.game.add.tween(brick.body);
      brickBounce.to({x:brick.body.x, y:brick.body.y - 10}, 100, Phaser.Easing.Linear.None);
      this.game.physics.arcade.collide(this.badGuys, brick, this.flipBadGuy, null,);
      brickBounce.onComplete.addOnce(function(){
        brickBounce.to({x:brick.body.x, y:brick.body.y + 17}, 100, Phaser.Easing.Linear.None);
        brickBounce.start();
      });
      brickBounce.start();
    }
  },

  flipBadGuy: function(brick, badGuy){
      VerticalMario.GameState.shellHitSound.play();
      badGuy.body.velocity.y = -35;
      badGuy.body.velocity.x = 0;
      badGuy.body.checkCollision.left = false;
      badGuy.body.checkCollision.right = false;
      badGuy.body.checkCollision.down = false;
      badGuy.body.checkCollision.up = false;
      badGuy.animations.play('flipped');
      if(brick.key == "koopa"){
        brick.body.velocity.x *= 2;
      }
  },

  killPointSprite: function(pointSprite){
    pointSprite.kill();
  },

  killSprite: function(badGuy){
    badGuy.body.checkCollision.left = false;
    badGuy.body.checkCollision.right = false;
    badGuy.body.checkCollision.down = false;
    badGuy.body.checkCollision.up = false;
    badGuy.kill();
  },

  gameOver: function(){
    startGame = false;
    VerticalMario.GlobalsScore = this.score;
    this.game.state.start('InputScoreState');
  },

  randomPlacement: function(){
    var r = Math.random();
    var ranX;
    if(r >= 0.5){
      ranX = 100;
    }else{
      ranX = 500;
    }
    return ranX;
  }
}

