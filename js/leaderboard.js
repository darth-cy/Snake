(function() {
  if (typeof window.SnakySnake == "undefined") {
    window.SnakySnake = {};
  }

  var Leaderboard = SnakySnake.Leaderboard = function() {
    this.rank = [];
  };

  Leaderboard.prototype.send = function (newScore) {
    this.rank.push(newScore);
    this.rank.sort(function(a, b) {
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      } else {
        return 0;
      }
    });

    this.rank = this.rank.slice(0, 10);
  };

})();
