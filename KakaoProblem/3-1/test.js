var solution = require('./solution').solution;
var assert = require('assert');

var inputs = [[2,4,2,1], [16,16,2,1], [16,16,2,2]];

var outputs = ["0111", "02468ACE11111111", "13579BDF01234567"];


for(var i=0;i<inputs.length;i++){
  assert.equal(solution.apply(null, inputs[i]), outputs[i]);
}
