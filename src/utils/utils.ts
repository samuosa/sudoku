export const validateMatrix = (matrix:number[][]) => {
  if (!Array.isArray(matrix) || matrix.length !== 9) {
    return false;
  }
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== 9) {
      return false;
    }
  }
  return true;
};

export const validateBasic = (numbers: number [][], callback:(value:boolean[][])=>void) => {
  const valid = [
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
  ];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      valid[row][col] = true;
    }
  }
  console.log("here");
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (numbers[row][col] == 0) {
        valid[row][col] = true;
        continue;
      }
      for (let i = 0; i < 9; i++) {
        if (i != col && numbers[row][i] == numbers[row][col]) {
          valid[row][col] = false;
          valid[row][i] = false;
        }
        if (i != row && numbers[i][col] == numbers[row][col]) {
          valid[row][col] = false;
          valid[i][col] = false;
        }
      }
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
          if (i != row && j != col && numbers[i][j] == numbers[row][col]) {
            valid[row][col] = false;
            valid[i][j] = false;
          }
        }
      }
    }
  }
  callback(valid);
};
export const fillNotes = (
  numbers: number[][],
  callback: (notes: number[][][]) => void
): void => {
  const notes: number[][][] = [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      for (let value = 1; value <= 9; value++) {
        if (numbers[row][col] === 0) {
          if (
            !findInRow(numbers, row, value) &&
            !findInCol(numbers, col, value) &&
            !findInBox(numbers, row, col, value)
          ) {
            notes[row][col].push(value);
          }
        }
      }
    }
  }
  callback(notes);
};

// Example implementations of findInRow, findInCol, and findInBox
const findInRow = (numbers: number[][], row: number, value: number): boolean => {
  return numbers[row].includes(value);
};

const findInCol = (numbers: number[][], col: number, value: number): boolean => {
  return numbers.some(row => row[col] === value);
};

const findInBox = (numbers: number[][], row: number, col: number, value: number): boolean => {
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let i = boxRowStart; i < boxRowStart + 3; i++) {
    for (let j = boxColStart; j < boxColStart + 3; j++) {
      if (numbers[i][j] === value) {
        return true;
      }
    }
  }
  return false;
};
 export const compareNotes = (notes:number[][][], notes2:number[][][], callback:(value:number[][][])=>void) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const updatedValues = [];
      for (const value of notes[row][col]) {
        if (notes2[row][col].includes(value)) {
          updatedValues.push(value);
        }
      }
      if (updatedValues.length === 0) {
        notes[row][col] = [...notes2[row][col]];
      } else {
        notes[row][col] = updatedValues;
      }
    }
  }
  callback(notes);
};
/**
 
export const add2OptionsNotes = (numbers:number [][], callback:(value:number[][][])=>void) => {
  const notes:number[][][] = [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],

    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ]
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (numbers[row][col] == 0) {
        for (let i = 1; i <= 9; i++) {
          if (!findInRow(numbers, row, i) && !findInCol(numbers, col, i) && !findInBox(numbers, row, col, i)) {
            notes[row][col].push(i);
          }
        }
      }
    }
  }

  callback(notes);
}
 */