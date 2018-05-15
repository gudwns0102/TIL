function createSet(str){
  var result = [];

  for(var i=0; i<str.length-1;i++){
    var ele = str[i] + str[i+1];
    if(/[A-Z]{2}/.test(ele)){
      result.push(str[i] + str[i+1]);
    }
  }

  return result;
}

module.exports.solution = function(str1, str2){
  const SCALE = 65536;
  var set1 = createSet(str1.toUpperCase());
  var set2 = createSet(str2.toUpperCase());

  if(set1.length == 0 && set2.length == 0){
    return SCALE * 1;
  }

  var intersection = [];

  for(ele1 of set1){
    var index = set2.indexOf(ele1);
    if(index != -1){
      intersection.push(set2.splice(index, 1));
    }
  }

  var union = set1.concat(set2);

  for(ele of intersection){
    var index = union.indexOf(ele);
    if(index != -1){
      union.splice(index, 1);
    }
  }

  return Math.floor(SCALE * intersection.length / union.length);
}