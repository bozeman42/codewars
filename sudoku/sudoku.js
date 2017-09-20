var puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]];


  function sudoku(puzzle) {
    //return the solved puzzle as a 2d array of 9 x 9
    var objPuzzle = puzzle.map(function(row,rowIndex){
      return row.map(function(element,columnIndex){
        return new SudokuNumber(element,rowIndex,columnIndex);
      });
    });
    do {
      var progress = false;
      objPuzzle.forEach(function(rowToTest){
        rowToTest.forEach(function(number){
          if (number.number === 0) {
            var rowChange = number.testRow(objPuzzle);
            var colChange = number.testColumn(objPuzzle);
            var squareChange = number.testSquare(objPuzzle);
            if (rowChange || colChange || squareChange) {
              progress = true;
            }
          }
        });
      });
    } while (progress === true);
    return objPuzzle.map(function(row){
      return row.map(function(sudokuNumber){
        return sudokuNumber.number;
      });
    });
  }

  function SudokuNumber(number,row,column){
    this.number = number;
    this.options = [1,2,3,4,5,6,7,8,9];
    this.row = row;
    this.column = column;
    this.square = (Math.floor(this.column / 3) + (3 * Math.floor(this.row / 3)));

    this.testRow = function(puzzle){
      var changeMade = false;
      var col = this.column;
      var row = this.row;
      puzzle[row].forEach(function(otherNumber){
        if(otherNumber.column != col && otherNumber.number !== 0){
          puzzle[row][col].options = puzzle[row][col].options.filter(function(option){
            return (option != otherNumber.number);
          });
        }
      });
      if (this.options.length === 1) {
        this.number = this.options[0];
        changeMade = true;
      }
      return changeMade;
    };

    this.testColumn = function(puzzle){
      var changeMade = false;
      var numCol = this.column;
      var numRow = this.row;
      puzzle.forEach(function(row,rowNumber){
        var comparedNumber = row[numCol];
        if(comparedNumber.number !== 0 && rowNumber != numRow){
          puzzle[numRow][numCol].options = puzzle[numRow][numCol].options.filter(function(option){
            return (option != comparedNumber.number);
          });
        }
      });
      if (this.options.length === 1) {
        this.number = this.options[0];
        changeMade = true;
      }
      return changeMade;
    };

    this.testSquare = function(puzzle){
      var changeMade = false;
      var startRow = 3*(Math.floor(this.square / 3));
      var startColumn = 3*(this.square % 3);
      var numCol = this.column;
      var numRow = this.row;
      for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startColumn; j < startColumn+ 3; j++){
          puzzle[numRow][numCol].options = puzzle[numRow][numCol].options.filter(function(option){
            return (option != puzzle[i][j].number);
          });
        }
      }
      if (this.options.length === 1) {
        this.number = this.options[0];
        changeMade = true;
      }
    };
  }

console.log(sudoku(puzzle));