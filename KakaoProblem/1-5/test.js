var solution = require('./solution').solution;
var assert = require('assert');

var inputs = [
  ['FRANCE', 'french'],
  ['handshake',	'shake hands'],
  ['aa1+aa2', 'AAAA12'],
  ['E=M*C^2', 'e=m*c^2']
]

var outputs = [16384, 65536, 43690, 65536];

for(var i=0;i<inputs.length;i++){
  assert.equal(solution.apply(null, inputs[i]), outputs[i]);
}