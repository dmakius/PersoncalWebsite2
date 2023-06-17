var VerticalMario = VerticalMario || {};

VerticalMario.BootState = {
  preload: function(){
    this.game.load.image('background','public/VerticalMario/assets/bg.png');
    this.game.load.image('preloader', 'public/VerticalMario/assets/preloader.png');
    this.game.load.bitmapFont('gameFont', 'public/VerticalMario/assets/fonts/font.png', 'public/VerticalMario/assets/fonts/font.fnt');
    this.game.load.bitmapFont('marioFont', 'public/VerticalMario/assets/fonts/mario20_0.png', 'public/VerticalMario/assets/fonts/mario20.fnt');
  },

  create: function(){
    this.game.state.start('PreloadState');
  }
}
