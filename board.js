const blank = function() {
  return { piece: ' ' };
}

const arrayWith = function(constructor, length) {
  var ary = [];
  for (var i = 0; i < length; ++i) {
    ary.push(constructor());
  }

  return ary;
}

const outOfBounds = (n) => n < 0 || n > 14

var board = {
  init: function() {
    const col = () => arrayWith(blank, 15);
    board.cells = arrayWith(col, 15);
  },

  set: function(x, y, value) {
    board.cells[x][y].piece = value;
  },

  free: (x, y) =>
    (!outOfBounds(x) && !outOfBounds(y) && board.get(x, y).piece === ' '),

  get: function(x, y) {
    if (outOfBounds(x) || outOfBounds(y)) { return undefined; }
    return board.cells[x][y];
  },

  walk: function(x, y, wx, wy, length) {
    var walked = [];
    for(var i = 1; i <= length; ++i) {
      walked.push(board.get(x + (wx * i), y + (wy * i)));
    }
    return walked.filter((v) => v != undefined);
  },

  grow: function(x, y, length) {
    var origin = board.get(x, y);
    const walkDir = (pair) => board.walk(x, y, pair[0], pair[1], length)
    const invert = (dir) => [dir[0] * -1, dir[1] * -1]
    const join = (dir) => walkDir(dir).reverse().concat(origin).concat(walkDir(invert(dir)))

    return [ [-1, 0], [-1, -1], [0, -1], [1, -1] ].map((dir) => join(dir));
  }

};

module.exports = board;
