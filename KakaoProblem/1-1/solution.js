module.exports.solution = function (n, arr1, arr2) {

  var result = [];

  for(var i=0; i<n; i++){
    var string = (arr1[i] | arr2[i]).toString(2);
    string = '0'.repeat(n-string.length) + string;
    result.push(string.replace(/1/g, '#').replace(/0/g, ' '));
  }

  return result;
}

