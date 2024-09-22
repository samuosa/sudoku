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

      <div class="notes">
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
                    <td class="note" v-for="(noteCol) in [0, 1, 2]" :key="noteCol" :class="{
                      selectedNumber: noteRow * 3 + noteCol + 1 == selected[2] && notes[rowIndex][colIndex].find((n) => n == (noteRow * 3 + noteCol + 1))
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
              invalid: !valid[rowIndex][colIndex] && isInput(rowIndex, colIndex),
              input: isInput(rowIndex, colIndex),
              left: colIndex % 3 == 0,
              top: rowIndex % 3 == 0,
              right: colIndex == 8,
              bottom: rowIndex == 8,
              highlight: colIndex == selected[1],
              selectedBox: assignBox(rowIndex) == assignBox(selected[0]) && assignBox(colIndex) == assignBox(selected[1]),
              selected: rowIndex == selected[0] && colIndex == selected[1],
              edit: rowIndex == editField[0] && colIndex == editField[1] && edit,
              selectedNumber: col == selected[2] && col != 0,
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
            <td class="cell" v-for="(number, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" :key="index"
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
    <button @click="noteMode = !noteMode">Toggle notes</button>
    <button @click="addNotes">fill Notes</button>
    <button @click="validateField">validate field</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, defineProps, PropType } from 'vue';
import { validateMatrix } from './utils/utils';
import { SudokuState } from './utils/SudokuState';


const props = defineProps({
  input: {
    type: Array as PropType<number[][]>,
    required: true,
    validator: validateMatrix
  },
});
const {numbers, notes, valid, edit, editField, selected, noteMode, isInput, setNumber, addNotes, setSelected, handleClick, validateField, handleKeyup, assignBox} = SudokuState(props.input);




onMounted(() => {
  window.addEventListener('keyup', handleKeyup);
  window.addEventListener('keydown', (event) => { event.preventDefault(); });
});

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup);
  window.removeEventListener('keydown', (event) => { event.preventDefault(); });
});



</script>