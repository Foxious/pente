'use strict';

const render = {
  render: function(map) {
    var width = map.length,
      height = map[0].length

    console.log(render.head(width));
    for(let y = 0; y < height; ++y) {
      console.log(render.border(width + 2));
      let row = [y];
      for(let x = 0; x < width; ++x){
        row.push(map[x][y]);
      }
      row.push(' ');

      console.log(render.row(row));
    }

  },

  head: (size) => {
    var rowData = [' '];
    for(var i = 0; i < size; ++i) {
      rowData.push(i);
    }
    rowData.push(' ');
    return render.row(rowData);
  },

  border: (size) => (
    (new Array(size)).fill('---').join('+')
  ),

  row: (data) => (
    data.map(render.cell).join('|')
  ),

  cell: (c) => (
    c.toString().length > 1 ? ` ${c}` : ` ${c} `
  )
};

module.exports = render;
