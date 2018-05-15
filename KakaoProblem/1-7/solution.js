function cal(S, T){
  var hour = parseInt(S.split(":")[0]);
  var minute = parseInt(S.split(":")[1]);
  var second = parseFloat(S.split(":")[2]);

  var seconds = hour*3600 + minute*60 + second - T + 0.001;

  hour = ~~(seconds / 3600) + '';
  hour = '0'.repeat(2-hour.length) + hour;

  minute = ~~((seconds % 3600)/60) + '';
  minute = '0'.repeat(2-minute.length) + minute;
  
  second = (seconds % 60).toFixed(3) + '';
  second = '0'.repeat(6-second.length) + second;
  
  return hour + ":" + minute + ":" + second;
} 

module.exports.solution = function(lines){
  
  var q = [];
  var timetable = [];

  for(line of lines){
    var s = line.split(" ")[1];
    var t = parseFloat(line.split(" ")[2]);
    var a = cal(s, t);

    q.push({value: s, type: 'S'});
    q.push({value: a, type: 'A'});
  }

  q = q.sort((a, b) => {

    var ahour = parseInt(a.value.split(":")[0]);
    var aminute = parseInt(a.value.split(":")[1]);
    var asecond = parseFloat(a.value.split(":")[2]);

    var bhour = parseInt(b.value.split(":")[0]);
    var bminute = parseInt(b.value.split(":")[1]);
    var bsecond = parseFloat(b.value.split(":")[2]);

    var hour = ahour - bhour;
    var minute = aminute - bminute;
    var second = asecond - bsecond;

    var seconds = hour * 3600 + minute * 60 + second;

    return seconds;
  });

  var temp = "00:00:00.000";
  var throughput = 0;
  for(var i=0;i<q.length;i++){
    var { value, type } = q[i];
    if(type == 'A'){
      timetable.push([temp, cal(value, 0.002), throughput, type]);
      temp = value;
      throughput++;
    } else {
      timetable.push([temp, value, throughput, type]);
      temp = cal(value, 0);
      throughput--;
    }
  }

  var max = 0;

  for(var i=0; i<timetable.length;i++){
    var row = timetable[i];
    if(row[3] == 'S'){
      var throughput = row[2];
      var time = cal(row[1], -0.998);
      for(var j=i+1; j<timetable.length;j++){
        var temprow = timetable[j];
        if(temprow[3] == 'A' && time > temprow[1]){
          throughput++;
        }
      }
    }

    throughput > max ? max = throughput : null;
  }

  return max;
}