(function(){
  if(typeof SnakySnake === "undefined"){
    SnakySnake = {};
  }

  var Coord = SnakySnake.Coord = function(x, y){
    this.x = x;
    this.y = y;
  }

  Coord.prototype.plus = function(coord){
    return new Coord((this.x + coord.x)%15, (this.y + coord.y)%15);
  }

  Coord.prototype.equals = function(coord){
    return ((this.x === coord.x) && (this.y === coord.y));
  }

  // Coord.prototype.isOpposite = function(dir, coord){ //
  //   return ((this.x - dir.x === coord.x) && (this.y - dir.y === coord.y));
  // }

  var Snake = SnakySnake.Snake = function(board){
    this.board = board;
    this.dir = new SnakySnake.Coord(0, 1);
    this.head = new SnakySnake.Coord(5, 5);
    this.segments = [
      new SnakySnake.Coord(5, 5),
      new SnakySnake.Coord(5, 4),
      new SnakySnake.Coord(5, 3),
      new SnakySnake.Coord(5, 2)
    ];
  }

  Snake.prototype.setDirection = function(str){
    if(str === "W"){
      this.turn(new SnakySnake.Coord(-1, 0));
    }else if(str === "D"){
      this.turn(new SnakySnake.Coord(0, 1));
    }else if(str === "A"){
      this.turn(new SnakySnake.Coord(0, -1));
    }else if(str === "S"){
      this.turn(new SnakySnake.Coord(1, 0));
    }
  }

  Snake.prototype.turn = function(coord){
    if(!this.segments[1].equals(this.head.plus(coord))){
      this.dir = coord;
    }
  }

  Snake.prototype.move = function(){
    var head = this.head.plus(this.dir);
    this.segments.unshift(new Coord(head.x, head.y));
    this.head = head;

    if (this.segments.slice(1).some(function(segment) { return segment.equals(head); })) {
      this.board.end = true;
      alert("You have nom nommed yourself!");
    }

    if (this.board.apple && head.equals(this.board.apple)) {
      this.board.score += 100;
      this.board.apple = null;
    } else {
      this.segments.pop();
    }
  }

  var Board = SnakySnake.Board = function(){
    this.score = 0;
    this.size = 15; // WARNING: hard coded grid size.
    this.end = false;
    this.grid = Array.apply(null, Array(15)).map(function(){
      return Array.apply(null, Array(15)).map(function(){
        return 0;
      })
    })
    this.apple = randomCoord();
    this.snake = new Snake(this);
  }

  function randomCoord(){
    row = Math.floor(Math.random()*15);
    col = Math.floor(Math.random()*15);
    return new Coord(row, col);
  }

  Board.prototype.generateApple = function(){
    var board = this;
    if (!board.apple) {
      board.apple = randomCoord();
      if (board.snake.segments.some(function(segment) { return board.apple.equals(segment); })) {
        board.apple = randomCoord();
      }
    }
  }

  Board.prototype.render = function () {
    this.grid = Array.apply(null, Array(15)).map(function(){
      return Array.apply(null, Array(15)).map(function(){
        return "- ";
      })
    })

    var board = this;

    // this.snake.segments.forEach(function(segment) {
    //   board.grid[segment.x][segment.y] = "S ";
    // });

    return this.segments;

    // var output = "";
    //
    // this.grid.forEach(function(row) {
    //   row.forEach(function(cell) {
    //     output += cell;
    //   });
    //   output += "\n";
    // });
    //
    // var pre = $("<pre></pre>");
    // pre.text(output);
    //
    // $("body").html(pre);
  };





























})();
