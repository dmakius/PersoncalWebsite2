var VerticalMario = VerticalMario || {};

VerticalMario.Mario = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'mario');
  this.anchor.setTo(0.5);
  this.scale.setTo(1.25);
  this.game.physics.arcade.enable(this);
  this.score = 0;
  this.enableBody = true;
  this.body.gravity.y = 700;
  this.facingRight = true;
  this.dead = false;

  this.deadSound = this.game.add.audio('dead');
  this.jumpSound = this.game.add.audio('jump');

  this.animations.add('standRight', [0], 1, true);
  this.animations.add('standLeft', [14], 1, true);
  this.animations.add('walkingLeft', [15,16,17], 10, true);
  this.animations.add('walkingRight', [1,2,3], 10, true);
  this.animations.add('jumpLeft', [18], 1, true);
  this.animations.add('dead', [12] , 1, true);
  this.animations.add('jumpRight', [4], 1, true);
  this.animations.play('standRight');

  this.cursors = game.input.keyboard.createCursorKeys();
}

VerticalMario.Mario.prototype = Object.create(Phaser.Sprite.prototype);
VerticalMario.Mario.prototype.constructor = VerticalMario.Mario;

VerticalMario.Mario.prototype.update = function(){
  if(this.dead == false){
    if((this.cursors.up.isDown && this.body.wasTouching.down) ||playerJump && this.body.wasTouching.down){
      this.jumpSound.play();
      this.body.velocity.y = -440;
    }else if(this.cursors.left.isDown || movingLeft){
      this.body.velocity.x = -150;
      this.facingRight = false;
      this.animations.play('walkingLeft');
    }else if(this.cursors.right.isDown || movingRight){
      this.body.velocity.x = 150;
      this.facingRight = true;
      this.animations.play('walkingRight');
    }else if(this.facingRight){
      this.body.velocity.x = 0;
      this.animations.play('standRight');
    }else{
      this.body.velocity.x = 0;
      this.animations.play('standLeft');
    }

    //adding jumping frames
    if(this.body.touching.down == false){
        if(this.facingRight == true){
          this.animations.play("jumpRight");
        }else{
          this.animations.play("jumpLeft");
        }
    }

    if(this.body.y >= 500){
      this.deadSound.play();
      VerticalMario.GlobalsScore = this.score;
      this.game.state.start('InputScoreState');
    }

    //moving out of bounds
    if(this.body.x >= 700){
      this.body.x = -9;
    }
    if(this.body.x <= -10){
      this.body.x = 700;
    }

  }
};
