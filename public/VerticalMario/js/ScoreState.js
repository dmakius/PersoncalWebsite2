var VerticalMario = VerticalMario || {};
VerticalMario.ScoreState = {
  preload: function(){
    startGame = false;
    this.sortScores();
  },
  
  create: function(){
    this.highScores = VerticalMario.GameState.highScores;
    console.log(this.highScores);

    this.background = this.game.add.sprite(0,0, 'background');
    this.game.title = this.game.add.bitmapText(this.game.world.centerX, 50, "gameFont", "High Scores" , 36);
    this.game.title.anchor.setTo(0.5);

    
      for(var x = 0; x < 5;x++){
        // if(this.highScores.length > x){
        //   this.game.add.bitmapText(50, 50*x + 100, "gameFont", this.highScores[x].name , 28);
        //   this.game.add.bitmapText(550, 50*x + 100, "gameFont",  this.highScores[x].score , 28);
        // }
        
      }

      if(mobileGame){
        this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press Start to Continue", 28);
      }else{
        this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press SPACEBAR to Continue", 28);
      }
    this.continueSign.anchor.setTo(0.5);
    this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  

  update:function(){
    if(mobileGame){
      if(startGame){
        this.game.state.start('MenuState');
      }
    }else{
      if(this.start.isDown){
        this.game.state.start('MenuState');
      }
    }
   
  },

  sortScores: function(){
    // var scores = VerticalMario.GameState.highScores;
    // for(var x = 0; x < VerticalMario.GameState.highScores.length; x++){
    //   for(var y= 0; y < VerticalMario.GameState.highScores.length; y++){
    //     if(scores[x].score > scores[y].score){
    //       var temp = scores[x];
    //       scores[x] = scores[y];
    //       scores[y] = temp;
    //     } 
    //   }
    // }
    // VerticalMario.GameState.highScores = scores;
  }
}