export const validateMatrix = (matrix) => {
  if (!Array.isArray(matrix) || matrix.length !== 9) {
    return false;
  }
  for (let row of matrix) {
    if (!Array.isArray(row) || row.length !== 9) {
      return false;
    }
  }
  return true;
};