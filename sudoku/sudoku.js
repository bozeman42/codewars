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
    objPuzzle.forEach(function(row){
      row.forEach(function(number){
        if (number.number === 0)
        number.testRow(objPuzzle);
        number.testColumn(objPuzzle);
      });
    });
    console.log(objPuzzle);
  }

  function SudokuNumber(number,row,column){
    this.number = number;
    this.options = [1,2,3,4,5,6,7,8,9];
    this.row = row;
    this.column = column;
    this.testRow = function(puzzle){
      var changeMade = false;
      var col = this.column;
      puzzle[this.row].forEach(function(otherNumber){
        if(otherNumber.column != col){
          row[col].options = row[col].options.filter(function(option){
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
      var col = this.column;
      puzzle.forEach(function(row){
        if(row[col].number !== 0 && row[col].row != this.row){
          row[col].options = row[col].options.filter(function(option){
            return (option != row[col].number);
          });
        }
      });
      if (this.options.length === 1) {
        this.number = this.options[0];
        changeMade = true;
      }
      return changeMade;
    };
  }


  // use column number to iterate over the numbers in each column
  function testColumn(number,puzzle){
    var used = [];

    for (var i = 0; i < puzzle.length; i++) {

    }
  }
