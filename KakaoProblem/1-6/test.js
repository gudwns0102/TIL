var solution = require('./solution').solution;
var assert = require('assert');

var inputs = [
  [4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']],
  [6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']],
];

var outputs = [14, 15];

for(var i=0;i<inputs.length;i++){
  assert.equal(solution.apply(null, inputs[i]), outputs[i]);
}

