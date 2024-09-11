<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import { Ref, ref, watch } from "vue";

const numRows = ref(2);
const numCols = ref(2);

// To hold matrix coefficients
const matrix = ref(
  Array.from({ length: numRows.value }, () =>
    Array.from({ length: numCols.value }, () => 0)
  )
);
watch([numRows, numCols], ([newRows, newCols]) => {
  // Resize matrix rows
  if (matrix.value.length < newRows) {
    // Add new rows
    for (let i = matrix.value.length; i < newRows; i++) {
      matrix.value.push(Array.from({ length: newCols }, () => 0));
    }
  } else if (matrix.value.length > newRows) {
    // Remove extra rows
    matrix.value.length = newRows;
  }

  // Resize columns for each row
  matrix.value.forEach((row) => {
    if (row.length < newCols) {
      // Add new columns
      row.push(...Array.from({ length: newCols - row.length }, () => 0));
    } else if (row.length > newCols) {
      // Remove extra columns
      row.length = newCols;
    }
  });
});

const operators: Ref<Array<"=" | "<=" | ">=">> = ref(
  Array.from({ length: numCols.value }, () => "=")
);
watch(numRows, (newRows) => {
  if (operators.value.length < newRows) {
    // Add new rows
    for (let i = operators.value.length; i < newRows; i++) {
      operators.value.push("=");
    }
  } else if (operators.value.length > newRows) {
    // Remove extra rows
    operators.value.length = newRows;
  }
});

const rhs = ref(Array.from({ length: numRows.value }, () => 0));
watch(numRows, (newRows) => {
  if (rhs.value.length < newRows) {
    // Add new rows
    for (let i = rhs.value.length; i < newRows; i++) {
      rhs.value.push(0);
    }
  } else if (rhs.value.length > newRows) {
    // Remove extra rows
    rhs.value.length = newRows;
  }
});
</script>

<template>
  <div>
    <h1>LP Solver</h1>
    <div>
      <label for="numRows">Number of constaints (rows):</label>
      <InputNumber v-model="numRows" :use-grouping="false" :min="1" />
    </div>
    <div>
      <label for="numCols">Number of variables (columns):</label>
      <InputNumber v-model="numCols" :use-grouping="false" :min="1" />
    </div>
  </div>
  <hr />
  <!-- Generate matrix -->
  <div>
    <table>
      <tr v-for="i in numRows" :key="i">
        <td>Constraint {{ i }}:&nbsp;</td>
        <td v-for="j in numCols" :key="j">
          <InputNumber
            :input-style="{ width: '50px' }"
            :use-grouping="false"
            v-model="matrix[i - 1][j - 1]"
          />
          &nbsp;<span v-html="$latex(`x_${j}`)" />&nbsp;
          <span v-if="j < numCols">+</span>
        </td>
        <td>
          &nbsp;
          <select v-model="operators[i - 1]">
            <option value="=">=</option>
            <option value=">=">&ge;</option>
            <option value="<=">&le;</option>
          </select>
          &nbsp;
        </td>
        <td>
          <InputNumber
            :input-style="{ width: '50px' }"
            :use-grouping="false"
            v-model="rhs[i - 1]"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
