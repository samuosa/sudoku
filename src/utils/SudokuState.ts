import { ref, Ref } from 'vue';
import { validateBasic, fillNotes, compareNotes } from '../utils/utils';
import { Tripel, Tupel } from '../assets/types';

export function SudokuState(input: number[][]) {
  const numbers: Ref<number[][]> = ref(input);
  const inputs: Ref<boolean[][]> = ref(input.map((row) => row.map((col) => col == 0)));
  const notes: Ref<number[][][]> = ref(input.map((row) => row.map(() => [])));
  const valid: Ref<boolean[][]> = ref(input.map((row) => row.map(() => true)));


  const edit: Ref<boolean> = ref(false);
const editField: Ref<Tupel> = ref([9, 9]);
const selected: Ref<Tripel> = ref([9, 9, 0]);
const noteMode: Ref<boolean> = ref(false);

const isInput = (row: number, col: number) => {
  if (row < inputs.value.length && row >= 0 && col >= 0)
    if (col < inputs.value[row].length) {
      return inputs.value[row][col];
    }
  return false;
}
const setNumber = (number: number) => {
  const row = editField.value[0];
  const col = editField.value[1];
  if (noteMode.value && numbers.value[row][col] == 0) {
    setNoteNumber(number, row, col);
  } else if (isInput(row, col)) {
    reomoveNoteBox(row, col, number);
    reomoveNoteCol(col, number);
    reomoveNoteRow(row, number);
    numbers.value[row].splice(col, 1, number);
  }
  setSelectedNumber();
  validateField();
}
const addNotes = () => {
  fillNotes(numbers.value, (value: number[][][]) => {
    compareNotes(notes.value, value, (value: number[][][]) =>{
      notes.value = value;
    });
  });
}
const setNoteNumber = (number:number, row:number, col:number) => {
  if (notes.value[row][col].find((n) => n == number)) {
    notes.value[row][col] = notes.value[row][col].filter((n) => n != number);
  } else {
    notes.value[row][col].push(number);
  }
}
const setSelectedNumber = () => {
  const row = selected.value[0];
  const col = selected.value[1];
  selected.value = [row, col, numbers.value[row][col]];
}
const setSelected = (row:number, col:number) => {
  if (row >= 0 && row < 9 && col >= 0 && col < 9) {// !edit.value && isInput(row, col)) {
    selected.value.splice(0, 2, row, col);
    setSelectedNumber();
  }
};
const setSelectedOverwrite = (row:number, col:number) => {
  if (isInput(row, col) &&
    row >= 0 && row <= 8 &&
    col >= 0 && col <= 8) {
    selected.value.splice(0, 2, row, col);
    editField.value = [row, col];
    setSelectedNumber();
  }

};
const handleClick = (row:number, col:number) => {
  if(!isInput(row, col))
    edit.value = false;
  setMoveCheck(true, row, col)

}
const setMoveCheck = (value:boolean, row:number, col:number) => {
  if (isInput(row, col)) {
    editField.value = [row, col];
    edit.value = value;
    selected.value.splice(0, 2, row, col);
    setSelectedNumber();
  }
  else
    selected.value[2] = numbers.value[row][col];
}
const validateField = () => {
  validateBasic(numbers.value, (value) => { valid.value = value; console.log(value); console.log(valid.value) });
}
const reomoveNoteRow = (row:number, number:number) => {
  for (let i = 0; i < 9; i++) {
    notes.value[row][i] = notes.value[row][i].filter((n) => n != number);
  }
}
const reomoveNoteCol = (col:number, number:number) => {
  for (let i = 0; i < 9; i++) {
    notes.value[i][col] = notes.value[i][col].filter((n) => n != number);
  }
}
const reomoveNoteBox = (row:number, col:number, number:number) => {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      notes.value[i][j] = notes.value[i][j].filter((n) => n != number);
    }
  }
}


const handleKeyup = (event:KeyboardEvent ) => {
  let prevent = true;

  const key = event.key;
  switch (true) {
    case !edit.value:
      prevent = false;
      break;
    case /^[0-9]$/.test(key):
      setNumber(parseInt(key));
      break;
    case key === 'ArrowUp':
      setSelectedOverwrite(editField.value[0] - 1, editField.value[1]);
      break;
    case key === 'ArrowDown':
      setSelectedOverwrite(editField.value[0] + 1, editField.value[1]);
      break;
    case key === 'ArrowLeft':
      setSelectedOverwrite(editField.value[0], editField.value[1] - 1);
      break;
    case key === 'ArrowRight':
      setSelectedOverwrite(editField.value[0], editField.value[1] + 1);
      break;
    case key === 'n' || key === 'N':
      noteMode.value = !noteMode.value;
      break;
    case key === 'Backspace' || key === 'Delete':
      setNumber(0);
      break;
    default:
      prevent = false;
      edit.value = false;
      selected.value.splice(0, 2, 9, 9);
      break;
  }
  console.log(prevent)
  if (prevent)
    event.preventDefault();

}
const assignBox = (input:number) => {
  return Math.floor(input / 3);
}
  return { numbers, notes, valid, edit, editField, selected, noteMode, isInput, setNumber, addNotes, setSelected, handleClick, validateField, handleKeyup, assignBox };
}