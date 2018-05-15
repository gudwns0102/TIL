function add(time, minutes){
  var value = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]) + minutes;

  var hour = Math.floor(value/60).toString();
  hour = '0'.repeat(2 - hour.length) + hour;

  var minute = (value%60).toString();
  minute = '0'.repeat(2 - minute.length) + minute; 
  
  return hour + ':' + minute;
}


module.exports.solution = function(n, t, m, timetable){
  
  var next = '09:00';
  var queue = [];
  
  timetable = timetable.sort();

  for(var i=0; i<n; i++){
    var last = -1;
    queue = queue.concat(timetable.filter((value, index) => {
      value <= next ? last = index : null;
      return value <= next;
    }));

    last != -1 ? timetable.splice(0, last+1) : null;

    if( i != n-1 ){
      queue.splice(0, m);
      next = add(next, t);
    }
  }

  return queue.length < m ? next : add(queue[m-1], -1);
}