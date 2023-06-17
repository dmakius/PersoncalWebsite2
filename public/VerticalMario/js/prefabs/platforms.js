var VerticalMario = VerticalMario || {}
 
VerticalMario.Platforms  =  function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'brick');
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.velocity.y = 20;
}

VerticalMario.Platforms.prototype = Object.create(Phaser.Sprite.prototype);
VerticalMario.Platforms.prototype.constructor = VerticalMario.InitPlatforms;
