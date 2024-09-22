<template>
  <FieldWrapper :input="input"/>
</template>

<script lang="ts" setup>
import FieldWrapper from './FieldWrapper.vue'
const input=[
  [0, 0, 6, 0, 0, 0, 0, 7, 0],
  [8, 0, 0, 0, 0, 0, 0, 4, 6],
  [0, 0, 5, 3, 9, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 3, 0, 1],
  [2, 0, 7, 0, 0, 0, 0, 6, 9],
  [0, 0, 0, 5, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 9, 7, 0, 0, 0, 1, 5],
  [0, 6, 0, 0, 2, 8, 0, 0, 0],
]
</script>


<style></style>
