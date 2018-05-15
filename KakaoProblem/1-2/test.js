var solution = require('./solution').solution;
var assert = require('assert');

const inputs = ['1S2D*3T', '1D2S#10S', '1D2S0T', '1S*2T*3S', '1D#2S*3S', '1T2D3D#', '1D2S3T*'];
const outputs = [37, 9, 3, 23, 5, -4, 59];

inputs.map((input, index) => {
  assert.equal(solution(input), outputs[index]);
})
