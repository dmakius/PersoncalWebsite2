var VerticalMario = VerticalMario || {};
VerticalMario.InputScoreState = {

  create: function(){   
    if(mobileGame){
      $('.modal').css("display","block");
      $('#modal-score').text(VerticalMario.GlobalsScore);
    }

    this.getScores();

    //create score for game just played
    this.newScore = new Object();;
    this.newScore.score = VerticalMario.GlobalsScore;
   

    this.background = this.game.add.sprite(0,0, 'background');
     
    this.game.title = this.game.add.bitmapText(this.game.world.centerX, 50, "gameFont", "INPUT SCORE" , 48);
    this.game.title.anchor.setTo(0.5);
    this.game.title2 = this.game.add.bitmapText(this.game.world.centerX-150, this.game.world.centerY, "gameFont", "Name: " , 48);
    this.game.title2 = this.game.add.bitmapText(this.game.world.centerX-150, this.game.world.centerY + 50, "gameFont", "Score: "+  this.newScore.score , 48);


    this.username =  this.game.add.bitmapText(this.game.world.centerX-10, this.game.world.centerY, "gameFont", "" , 48);
    var username = this.username;
    this.game.input.keyboard.onPressCallback = function (letter, t, k) {
      username.setText(username.text += letter);
    };

    if(mobileGame){
      this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press Start to Continue", 28);
     
    }else{
      this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press SPACEBAR to Continue", 28);
      this.delete = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
      this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    
    this.continueSign.anchor.setTo(0.5);

  },

  update:function(){
    if(mobileGame == false){
      if(this.delete.isDown){
        this.deleteLetter();
      }
      if(this.username.text != "" && this.start.isDown ){
        console.log("Add score function starting");
        this.addScore(this.username.text,this.newScore.score);
        this.saveScore(this.username.text, this.newScore.score);
        this.game.state.start('ScoreState');
    }
   }else{
    if(this.username.text != "" && startGame ){
      console.log("Add score function starting");
      this.addScore(this.username.text, this.newScore.score);
      this.saveScore(this.username.text, this.newScore.score);
      this.game.state.start('ScoreState');
   }
  }
},
  saveScore: function(username, score){
    // $.ajax({
    //   type: "POST",
    //   url: '/Score/Create',
    //   data:{
    //     name: username,
    //     score: score
    //   },
    //   success: function(response){
    //       console.log(response);
    //   } 
    // });
  },

  addScore: function(username, score){
    // VerticalMario.GameState.highScores.push({
    //   _id:"blank",
    //   name: username,
    //   score: score});
  },

  deleteLetter: function(){
    this.username.text = "";
  },

  getScores: function(){
    // $.ajax({
    //   type: "GET",
    //   url: '/Score',
    //   async: false,
    //   success: function(response){
    //     console.log(response);
    //     VerticalMario.GameState.highScores = response;
    //   }
    //   });
  },
 
}