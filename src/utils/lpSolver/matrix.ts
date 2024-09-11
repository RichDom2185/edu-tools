import { cloneDeep, zip } from "es-toolkit";

/**
 * Converts a matrix to a triangular matrix.
 */
export const toTriangularMatrix = (matrix: number[][]): number[][] => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const triangularMatrix = cloneDeep(matrix);
  for (let i = 0; i < rows; i++) {
    for (let j = i + 1; j < rows; j++) {
      const factor = triangularMatrix[j][i] / triangularMatrix[i][i];
      for (let k = i; k < columns; k++) {
        triangularMatrix[j][k] -= factor * triangularMatrix[i][k];
      }
    }
  }
  return triangularMatrix;
};

/**
 * Checks if a square matrix is invertible.
 */
export const isMatrixInvertible = (matrix: number[][]): boolean => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  if (rows !== columns) {
    return false;
  }
  const triangularMatrix = toTriangularMatrix(matrix);
  for (let i = 0; i < rows; i++) {
    if (triangularMatrix[i][i] === 0) {
      return false;
    }
  }
  return true;
};

/**
 * Transposes a matrix.
 */
export const transpose = (matrix: number[][]): number[][] => {
  const M = matrix as any;
  const f = zip as any;
  return f(...M);
};
