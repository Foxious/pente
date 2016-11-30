const expect = require('chai').expect;
const board = require('../board');

describe("the game board", function(){
  beforeEach(function() {
    board.init();
  });

  describe('#init', function(){
    it('makes a clear board', function() {
      board.cells.map((cols) => cols.map((cell) => expect(cell).to.deep.equal({piece: ' '})));
    });
  });

  describe('#set', function() {
    beforeEach(function() {
      board.set(3, 5, "X");
    });
    it('sets the value of a cell', function() {
      expect(board.cells[3][5].piece).to.equal('X');
    });
  });

  describe('#get', function() {
    it('returns the value of a cell', function() {
      board.set(3, 5, "X");
      expect(board.get(3, 5).piece).to.equal('X');
    });

    describe('returns undefined', function() {
      it('when X is negative', function() {
        expect(board.get(-1, 5)).to.equal(undefined);
      });
      it('when X is too large', function() {
        expect(board.get(15, 5)).to.equal(undefined);
      });
      it('when Y is negative', function() {
        expect(board.get(1, -1)).to.equal(undefined);
      });
      it('when Y is too large', function() {
        expect(board.get(5, 15)).to.equal(undefined);
      });
    });
  });

  describe('#free', function() {
    it('returns true when the cell is empty', function() {
      expect(board.free(8, 8)).to.be.true;
    });
    it('returns false when out of bounds', function() {
      expect(board.free(-1, 16)).to.be.false;
    });
    it('returns false when the cell has a piece', function() {
      board.set(1, 1, 'X');
      expect(board.free(1, 1)).to.be.false;
    });
  });

  describe('#walk', function() {
    beforeEach(function() {
      board.set(3, 1, 'X');
      board.set(3, 2, 'X');
      board.set(3, 3, 'O');
    });
    it('captures cells in a direction, excluding the origin', function() {
      expect(board.walk(3, 1, 0, 1, 2).map((c) => c.piece)).to.deep.equal(['X', 'O']);
    });
    it('returns a shorter collection if it runs out of bounds', function() {
      expect(board.walk(1, 1, -1, -1, 5)).to.have.length(1);
    });
  });

  describe('#grow', function() {
    it('walks in all directions', function() {
      expect(board.grow(5, 5, 3)).to.have.length(4);
    });
    it('walks the full length for each direction', function() {
      var sections = board.grow(5, 5, 3);
      expect(sections[0]).to.have.length(7);
    });
  });
});

