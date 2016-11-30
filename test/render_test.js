const expect = require('chai').expect

const render = require('../render');

describe('#cell', function() {
  it('pads the value', () => { expect(render.cell(1)).to.equal(' 1 '); });

  it('only pads left when the value is larger than 1 char', () => { expect(render.cell(12)).to.equal(' 12') });
});

describe('#row', function() {
  it('makes a row from each element', function() {
    expect(render.row([' ', 0, 'A'])).to.equal('   | 0 | A ');
  });
});
