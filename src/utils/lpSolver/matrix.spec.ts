import { describe, expect, test } from "vitest";
import { isMatrixInvertible, toTriangularMatrix } from "./matrix";

const M = [
  [2, 2, 5, 1],
  [4, 1, 7, 2],
  [3, 4, 5, 1],
  [1, 2, 3, 4],
];

const S = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

describe("Matrix", () => {
  test("toTriangularMatrix", () => {
    const triangularMatrix = toTriangularMatrix(M);
    for (let i = 0; i < triangularMatrix.length; i++) {
      for (let j = 0; j < i; j++) {
        expect(triangularMatrix[i][j]).toBe(0);
      }
    }
  });

  test("isMatrixInvertible", () => {
    expect(isMatrixInvertible(M)).toBe(true);
    expect(isMatrixInvertible(S)).toBe(false);
  });
});
