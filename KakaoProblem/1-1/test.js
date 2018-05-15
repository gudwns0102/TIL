var solution = require('./solution').solution;
var assert = require('assert');

assert.deepEqual(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]), ["#####","# # #", "### #", "#  ##", "#####"]);
assert.deepEqual(solution(6, [46, 33, 33 ,22, 31, 50], [27 ,56, 19, 14, 14, 10]), ["######", "###  #", "##  ##", " #### ", " #####", "### # "]);