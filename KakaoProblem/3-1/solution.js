module.exports.solution = function(n, t, m, p){
  
  var arr = [];
  var result = [];
  var value = 0;
  var max = (t-1)*m + p;

  while(1){
    var string = value.toString(n);
    for(index in string){
      arr.push(string[index]);
      if(arr.length == max){
        break;
      }
    }

    if(arr.length >= max){
      break;
    }

    value++;
  }

  arr.map((v, i) => {
    i % m == p-1 ? result.push(v) : null;
    return 0;
  })

  return result.join("").toUpperCase();
}