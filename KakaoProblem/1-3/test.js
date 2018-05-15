var solution = require('./solution').solution;
var assert = require('assert');

var inputs = [
  [3, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']],
  [3, ['Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul']],
  [2, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'SanFrancisco', 'Seoul', 'Rome', 'Paris', 'Jeju', 'NewYork', 'Rome']],
  [5, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'SanFrancisco', 'Seoul', 'Rome', 'Paris', 'Jeju', 'NewYork', 'Rome']],
  [2, ['Jeju', 'Pangyo', 'NewYork', 'newyork']],
  [0, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']]
]

var outputs = [50, 21, 60, 52, 16, 25]
inputs.map((input, index) => {
  assert.equal(solution.apply(null, input), outputs[index]);
})
