(function(){
  if(typeof SnakySnake === "undefined"){
    SnakySnake = {};
  }

  var SnakeView = SnakySnake.SnakeView = function(leaderboard, $el){
    this.board = new SnakySnake.Board();
    this.leaderboard = leaderboard;
    this.$el = $el;
    $el.on("keydown", this.handleKeyEvent.bind(this));
    this.keyMap = { 87: "W", 83 : "S", 65: "A", 68: "D"};
    this.setupBoard();

    this.isPaused = false;

    this.interval = setInterval(this.step.bind(this), 200);
    this.displayLeaderboard();
  }

  SnakeView.prototype.newGame = function(){
    this.board = new SnakySnake.Board();
    this.displayLeaderboard();
  }

  SnakeView.prototype.handleKeyEvent = function(event){
    var board = this.board;
    var pressedKey = event.keyCode;
    if (pressedKey == 80) {
      this.pause();
      alert("The game is paused! Press R to resume!");
      return;
    } else if (pressedKey == 82){
      this.resume();
      return;
    }

    if (!this.isPaused) {
      board.snake.setDirection(this.keyMap[pressedKey]);
    }
  }

  SnakeView.prototype.pause = function () {
    clearInterval(this.interval);
    this.isPaused = true;
  };

  SnakeView.prototype.resume = function () {
    this.isPaused = false;
    this.interval = setInterval(this.step.bind(this), 200);
  };

  SnakeView.prototype.displaySnake = function(){
    $('.snake').removeClass('snake');

    this.board.snake.move();
    this.board.snake.segments.forEach(function(coord){
      var row = coord.x;
      var col = coord.y;

      var cell = $('.snake-game-box .row').eq(row).find('.cell').eq(col);

      cell.addClass('snake');
    });
  }

  SnakeView.prototype.step = function () {
    if(this.board.end){
      // clearInterval(this.interval);
      // this.$el.off("keydown");
      this.leaderboard.send({username: "guest", score: this.board.score})
      this.newGame();
      return;
    }

    this.board.generateApple();
    this.displaySnake();

    $('.apple').removeClass('apple');

    var apple = this.board.apple;
    if (apple) {
      var row = apple.x;
      var col = apple.y;
      var cell = $('.snake-game-box .row').eq(row).find('.cell').eq(col);
      cell.addClass('apple');
    }

    $(".scoreboard").text(this.board.score);

  };

  SnakeView.prototype.displayLeaderboard = function(){
    $('.leader').remove();
    var snakeview = this;
    snakeview.leaderboard.rank.forEach(function(leader){
      var tag = $("<h2></h2>");
      tag.addClass("leader");
      tag.text(leader["username"] + " : " + leader["score"]);
      snakeview.$el.append(tag);
    })
  }



  SnakeView.prototype.setupBoard = function () {
    var box = $('<div></div>');
    box.addClass('snake-game-box');

    for(var i=0; i < 15; i++){
      var row = $('<div></div>');
      row.addClass('row group');

      for(var j=0; j < 15; j++) {
        var cell = $('<div></div>');
        cell.addClass('cell');
        cell.data("position", {row: i, col: j});
        row.append(cell);
      }

      box.append(row);
    }

    this.$el.append(box);
    var score = $("<h1></h1>");
    score.addClass("scoreboard");
    score.text(this.board.score);
    this.$el.append(score);
  };
























})();
