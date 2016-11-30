const gm = require('./gm');
const render = require('./render');
const prompt = require('prompt');

var display = function() {
  render.render(gm.board.cells.map((row) => row.map((cell) => cell.piece)));
  console.log(`\nIt is ${gm.turn}'s turn`);
}

var random = () => Math.floor(Math.random() * 15);

var aiMove = function() {
  var move = [random(), random()];
  while(!gm.board.free.apply(gm.board, move)) { move = [random(), random()]; }

  return move;
}

var doTurn = function() {
  var thisTurn = gm.turn;

  var resolve = (err, result) => {
    var coords = result.move.match(/\d+/g);
    gm.place(parseInt(coords[0]), parseInt(coords[1]));

    if(gm.winner) {
      display()
      console.log(gm.winner, 'wins!');
      return;
    }

    if(thisTurn !== gm.turn) {
      display();
    } else {
      console.log('Invalid move');
    }

    doTurn();

  };

  if(gm.turn === 'X') {
    prompt.get(['move'], resolve);
  } else {
    resolve(null, { move: aiMove().join(',') } );
  }
}

gm.board.init();

prompt.start();
display();
doTurn();
