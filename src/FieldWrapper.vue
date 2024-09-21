<template>
  <h1>Samus super sudoku</h1>
  <div class="fieldContainer">

    <div class="field">
      <div class="input">
        <table @mouseleave="setSelected(9, 9)">
          <tr v-for="(row, rowIndex) in numbers" :key="rowIndex">
            <td class="cell" v-for="(col, colIndex) in row" :key="colIndex" :class="{
              left: colIndex % 3 == 0,
              top: rowIndex % 3 == 0,
              right: colIndex == 8,
              bottom: rowIndex == 8,
            }" @mouseover="setSelected(rowIndex, colIndex)" @click="handleClick(rowIndex, colIndex)">
            </td>
          </tr>
        </table>
      </div>

      <div class="notes" v-if="notesVisible">
        <table>
          <tr v-for="(row, rowIndex) in numbers" :key="rowIndex">
            <td class="cell" v-for="(col, colIndex) in row" :key="colIndex" :class="{
              left: colIndex % 3 == 0,
              top: rowIndex % 3 == 0,
              right: colIndex == 8,
              bottom: rowIndex == 8,
            }">
              <div v-if="numbers[rowIndex][colIndex] == 0" class="noteContainer">
                <table>
                  <tr v-for="(noteRow) in [0, 1, 2]" :key="noteRow">
                    <td class="note" v-for="(noteCol) in [0, 1, 2]" 
                      :key="noteCol" 
                      :class="{
                        selectedNumber: noteRow * 3 + noteCol + 1==selected[2]
                      }">
                      <span v-if="notes[rowIndex][colIndex].find((n) => n == (noteRow * 3 + noteCol + 1))">
                        {{ noteRow * 3 + noteCol + 1 }}
                      </span>
                    </td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>
        </table>
      </div>

      <div class="prefilled">
        <table>
          <tr v-for="(row, rowIndex) in numbers" :key="rowIndex" :class="{ highlight: rowIndex == selected[0] }">
            <td class="cell" v-for="(col, colIndex) in row" :key="colIndex" :class="{
              input: isInput(rowIndex, colIndex),
              left: colIndex % 3 == 0,
              top: rowIndex % 3 == 0,
              right: colIndex == 8,
              bottom: rowIndex == 8,
              highlight: colIndex == selected[1],
              selectedBox: assignBox(rowIndex) == assignBox(selected[0]) && assignBox(colIndex) == assignBox(selected[1]),
              selected: rowIndex == selected[0] && colIndex == selected[1],
              edit: rowIndex == selected[0] && colIndex == selected[1] && edit,
              invalid: !valid[rowIndex][colIndex] && isInput(rowIndex, colIndex),
              selectedNumber: col == selected[2] && col != 0 ,
            }">
              <span v-if="col != 0">
                {{ col }}
              </span>
              <span v-else>
              </span>
            </td>
          </tr>
        </table>


      </div>
      <br />
      <div class="inputs" :style="{ visibility: !edit ? 'hidden' : 'visible' }">
        <table>
          <tr>
            <td class="cell" v-for="(number, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="index"
              @click="() => setNumber(number)">
              {{ number }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <br />

  <div class="buttonRow">
    <button @click="notesVisible = !notesVisible">Toggle notes</button>
    <button @click="validateField">validate field</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps} from 'vue';
import { validateMatrix } from './utils/utils';

const props = defineProps({
  input: {
    type: Array,
    required: true,
    validator: validateMatrix
  },
});

const edit = ref(false);

const selected = ref([9, 9, 0]);
const notesVisible = ref(false);
const isInput = (row, col) => {
  if (row < inputs.value.length && row >= 0 && col >= 0)
    if (col < inputs.value[row].length) {
      return inputs.value[row][col];
    }
  return false;
}
const setNumber = (number) => {
  const row = selected.value[0];
  const col = selected.value[1];
  if (notesVisible.value && numbers.value[row][col] == 0) {
    setNoteNumber(number, row, col);
  } else if (isInput(row, col)) {
    numbers.value[row].splice(col, 1, number);
  }
}
const setNoteNumber = (number, row, col) => {
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
const setSelected = (row, col) => {
  if (!edit.value && isInput(row, col)) {
    selected.value.splice(0, 2, row, col);
    setSelectedNumber();
  }
};
const setSelectedOverwrite = (row, col) => {
  if (isInput(row, col) &&
    row >= 0 && row <= 8 &&
    col >= 0 && col <= 8) {
    selected.value.splice(0, 2, row, col);
    setSelectedNumber();
  }

};
const handleClick = (row, col) => {
  setMoveCheck(true, [row], [col])

}
const setMoveCheck = (value, row, col) => {
  if (isInput(row, col)) {
    edit.value = value;
    selected.value.splice(0, 2, row, col);
    setSelectedNumber();
  }
  else
    selected.value[2] = numbers.value[row][col];
}
const numbers = ref(props.input);

const inputs = ref(props.input.map((row) => row.map((col) => col == 0)));
const notes = ref(props.input.map((row) => row.map(() => [])))
const valid = ref(props.input.map((row) => row.map(() => true)))

const validateField = () => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      valid.value[row][col] = true;
    }
  }
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (numbers.value[row][col] == 0) {
        valid.value[row][col] = true;
        continue;
      }
      for (let i = 0; i < 9; i++) {
        if (i != col && numbers.value[row][i] == numbers.value[row][col]) {
          valid.value[row][col] = false;
          valid.value[row][i] = false;
        }
        if (i != row && numbers.value[i][col] == numbers.value[row][col]) {
          valid.value[row][col] = false;
          valid.value[i][col] = false;
        }
      }
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
          if (i != row && j != col && numbers.value[i][j] == numbers.value[row][col]) {
            valid.value[row][col] = false;
            valid.value[i][j] = false;
          }
        }
      }
    }
  }
}
onMounted(() => {
  window.addEventListener('keyup', handleKeyup);
  window.addEventListener('keydown', (event) => { event.preventDefault(); });
});

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup);
  window.removeEventListener('keydown', (event) => { event.preventDefault(); });
});
const handleKeyup = (event) => {
  event.preventDefault();
  if (event.key == 'n' || event.key == 'N') {
    notesVisible.value = !notesVisible.value;
  }
  if (!edit.value)
    return;
  const key = parseInt(event.key);
  if (key >= 0 && key <= 9) {
    setNumber(key);
  } else {
    switch (event.key) {
      case 'ArrowUp':
        setSelectedOverwrite(selected.value[0] - 1, selected.value[1]);
        break;
      case 'ArrowDown':
        setSelectedOverwrite(selected.value[0] - 0 + 1, selected.value[1]);
        break;
      case 'ArrowLeft':
        setSelectedOverwrite(selected.value[0], selected.value[1] - 1);
        break;
      case 'ArrowRight':
        setSelectedOverwrite(selected.value[0], selected.value[1] - 0 + 1);
        break;
      case 'n':
        break;
      case 'N':
        break;
      default:
        edit.value = false;
        selected.value.splice(0, 2, 9, 9);
        break;
    }
  }
}
const assignBox = (input) => {
  return Math.floor(input / 3);
}
</script>