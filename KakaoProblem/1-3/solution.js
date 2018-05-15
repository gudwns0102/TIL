
module.exports.solution = function(cacheSize, cities){
  
  var q = [];
  var time = 0;
  
  for(city of cities){
    city = city.toUpperCase();
    var index = q.indexOf(city);
    //Cache Hit
    if(index != -1){
      q.splice(index, 1);
      q.splice(0, 0, city);
      time += 1;
    } else {
    //Cache Miss
      if(cacheSize != 0){
        while(q.length >= cacheSize){
          q.pop();
        }
      }

      q.splice(0, 0, city);
      time += 5;
    }
  }  

  return time;
}