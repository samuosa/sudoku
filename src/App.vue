<template>
  <div class="fieldContainer">

    <div class="field">
      <div class="input">
        <table @mouseleave="setSelected(9, 9)">
          <tr v-for="(row, rowIndex) in grid" :key="rowIndex" :class="{ highlight: rowIndex == selected[0] }">
            <td class="cell" v-for="(col, colIndex) in row" :key="colIndex"
              :class="{ highlight: colIndex == selected[1], selected: rowIndex == selected[0] && colIndex == selected[1] }"
              @mouseover="setSelected(rowIndex, colIndex)">
              <span v-if="col != 0">
                {{ col }}
              </span>
              <span v-else>
              </span>
            </td>
          </tr>
        </table>
      </div>
  
      <div class="notes">
        <table @mouseleave="setSelected(9, 9)">
          <tr v-for="(row, rowIndex) in grid" :key="rowIndex" :class="{ highlight: rowIndex == selected[0] }">
            <td class="cell" v-for="(col, colIndex) in row" :key="colIndex"
              :class="{ highlight: colIndex == selected[1], selected: rowIndex == selected[0] && colIndex == selected[1] }"
              @mouseover="setSelected(rowIndex, colIndex)">
              <span v-if="col != 0">
                
              </span>
              <input type="text" v-else/>
            </td>
          </tr>
        </table>
      </div>
  
      <div class="prefilled">
        <table @mouseleave="setSelected(9, 9)">
          <tr v-for="(row, rowIndex) in grid" :key="rowIndex" :class="{ highlight: rowIndex == selected[0] }">
            <td class="cell" v-for="(col, colIndex) in row" :key="colIndex"
              :class="{ highlight: colIndex == selected[1], selected: rowIndex == selected[0] && colIndex == selected[1] }"
              @mouseover="setSelected(rowIndex, colIndex)">
              <span v-if="col != 0">
                {{ col }}
              </span>
              <span v-else>
              </span>
            </td>
          </tr>
        </table>
  
      </div>
      <button @click="updateGrid">Change Value</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const selected = ref([9, 9]);
    const setSelected = (row, col) => {
      selected.value = [row, col];
    };
    const grid = ref([
      [1, 0, 3, 1, 2, 3, 1, 2, 3],
      [4, 5, 6, 4, 5, 6, 4, 5, 6],
      [7, 8, 9, 7, 8, 9, 7, 8, 9],
      [1, 2, 3, 1, 2, 3, 1, 2, 3],
      [4, 5, 6, 4, 5, 6, 4, 5, 6],
      [7, 8, 9, 7, 8, 9, 7, 8, 9],
      [1, 2, 3, 1, 2, 3, 1, 2, 3],
      [4, 5, 6, 4, 5, 6, 4, 5, 6],
      [7, 8, 9, 7, 8, 9, 7, 8, 9],
    ]);
    const inputs = ref([
      [0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    const updateGrid = () => {
      grid.value[0].splice(1, 1, 99);
    };

    return { grid, updateGrid, selected, setSelected, inputs};
  },
};
</script>


<style></style>
