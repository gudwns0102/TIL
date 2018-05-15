module.exports.solution = function(m, n, inputboard){
  var initBitmap = [];
  var board = []
  var result = 0;

  for(var i=0;i<m;i++){
    initBitmap[i] = [];
    board[i] = [];
    for(var j=0;j<n;j++){
      initBitmap[i][j] = 0;
      board[i].push(inputboard[i][j]);
    }
  }

  while(1){
    var bitmap = JSON.parse(JSON.stringify(initBitmap));
    var dirtyBit = false;

    //1. Check board
    for(var i=0;i<m-1;i++){
      for(var j=0;j<n-1;j++){
        var square = [board[i][j], board[i+1][j], board[i][j+1], board[i+1][j+1]];
        square.reduce((prev, curr) => prev != ' ' && prev === curr ? prev : null) ? (
          bitmap[i][j] = bitmap[i+1][j] = bitmap[i][j+1] = bitmap[i+1][j+1] = 1,
          dirtyBit = true
        ) : null;
      }
    }

    if(dirtyBit){
      //2. Clear board
      for(var i=0;i<m;i++){
        for(var j=0;j<n;j++){
          bitmap[i][j] == 1 ? (board[i][j] = ' ', result++) : null;
        }
      }

      //3. Arrange board
      for(var j=0;j<n;j++){
        var temp = [];
        for(var i=0;i<m;i++){
          board[i][j] == ' ' ? temp.splice(0, 0, ' ') : temp.push(board[i][j]);
        }

        for(var i=0;i<m;i++){
          board[i][j] = temp[i];
        }
      }
    } else {
      break;
    }
  }

  return result;
}