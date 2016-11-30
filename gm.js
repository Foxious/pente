const flip = function(piece) {
  if (piece == 'X') { return 'O'; }
  if (piece == 'O') { return 'X'; }

  return piece;
};

const gm = {
  flips: {
    X: 0,
    O: 0
  },

  turn: 'X',
  board: require('./board'),
  place: function(x, y) {
    if (!gm.board.free(x, y)) {
      return;
    }

    gm.board.set(x, y, gm.turn);
    gm.flip(x, y)
    if (gm.matchedFiveAt(x, y) || gm.flips[gm.turn] > 4) {
      gm.winner = gm.turn;
    }
    gm.endTurn();
  },

  endTurn: function() {
    gm.turn = flip(gm.turn);
  },

  matchedFiveAt: function(x, y) {
    var match = (new Array(5)).fill(gm.turn).join('');
    return gm.board.grow(x, y, 4)
      .map((row) =>
        row.map((cell) => cell.piece).join('')
      ).some((row) => row.indexOf(match) !== -1);
  },

  flip: function(x, y){
    var enemy = flip(gm.turn);
    var match = [gm.turn, enemy, enemy, gm.turn].join('');

    gm.board.grow(x, y, 4)
      .forEach(function(row) {
        var matchPoint = row.map((cell) => cell.piece).join('').indexOf(match);
        if(matchPoint === -1) { return; }

        gm.flips[gm.turn]++;
        [row[matchPoint +1], row[matchPoint +2]].forEach((cell) => {
          cell.piece = ' ';
        });
      });
  }


};

gm.board.init();

module.exports = gm;
