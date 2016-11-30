var expect = require('chai').expect;
var gm = require('../gm');

describe('the Game Master', function() {
  beforeEach(function() {
    gm.board.init();
  });
  describe('#turn', function() {
    it('starts as Xs turn', function() {
      expect(gm.turn).to.equal('X');
    });
  });

  describe('#matchedFive', function() {
    var rows = [0, 1, 2, 3, 4];
    beforeEach(function() {
      rows.forEach((x) => { gm.board.set(x,0, 'X') });
    });

    it('detects a match starting at any point in a row', function() {
      expect(gm.matchedFiveAt(0, 0)).to.be.true;
      expect(gm.matchedFiveAt(1, 0)).to.be.true;
      expect(gm.matchedFiveAt(2, 0)).to.be.true;
      expect(gm.matchedFiveAt(3, 0)).to.be.true;
      expect(gm.matchedFiveAt(4, 0)).to.be.true;
    });
  });

  describe('#flip', function() {
    beforeEach(function() {
      gm.board.set(0, 0, 'X');
      gm.board.set(3, 0, 'X');
      gm.board.set(1, 0, 'O');
      gm.board.set(2, 0, 'O');
      gm.flips.X = 0;
    });

    it('clears pairs trapped by their enemy', function(){
      gm.flip(0, 0);
      expect(gm.board.get(0, 0).piece).to.equal('X');
      expect(gm.board.get(1, 0).piece).to.equal(' ');
      expect(gm.board.get(2, 0).piece).to.equal(' ');
      expect(gm.board.get(3, 0).piece).to.equal('X');
    });

    it('increases the flip count for that player', function(){
      gm.flip(0, 0);
      expect(gm.flips[gm.turn]).to.equal(1);
    });
  });

  describe('#place', function() {
    beforeEach(function() {
      gm.turn = 'X';
    });

    describe('when the cell is empty', function() {
      beforeEach(function() {
        gm.place(3, 3);
      });

      it('places the piece of the player whose turn it is', function() {
        expect(gm.board.get(3, 3).piece).to.equal('X');
      });

      it('changes whose turn it is', function() {
        expect(gm.turn).to.equal('O');
      });

    });

    describe('when the cell is not empty', function() {
      beforeEach(function(){
        gm.board.set(3, 3, 'O');
        gm.place(3, 3);
      });

      it('does not change the piece', function() {
        expect(gm.board.get(3, 3).piece).to.equal('O');
      });

      it('does not change whose turn it is', function() {
        expect(gm.turn).to.equal('X');
      });
    });

    describe('when the placement matches 5 in a row', function() {
      beforeEach(function() {
        gm.board.set(0, 0, 'X');
        gm.board.set(1, 0, 'X');
        gm.board.set(2, 0, 'X');
        gm.board.set(3, 0, 'X');
        gm.turn = 'X';
      });
      it('declares a winner', function() {
        gm.place(4, 0);
        expect(gm.winner).to.equal('X');
      });
    });

  });
});
