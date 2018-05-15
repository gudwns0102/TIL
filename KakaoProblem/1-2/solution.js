module.exports.solution = function (dartResult){
  
  var scores = [];

  dartResult.match(/\d+[S,D,T][*,#]?/g).map((round, index) => {
    var temp = round.match(/(\d+)([S,D,T])([*,#]?)/);

    var originScore = parseInt(temp[1]);
    var mult = temp[2];
    var option = temp[3];

    var score = Math.pow(originScore, mult == 'D' ? 2 : mult == 'T' ? 3 : 1) * (option == '*' ? 2 : option == '#' ? -1 : 1);  
    scores.push(score);

    if (index != 0 && option == '*'){
      scores[index-1] = scores[index-1] * 2;
    }
  })

  return scores[0] + scores[1] + scores[2];
}