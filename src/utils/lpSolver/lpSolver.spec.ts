import LPSolver from ".";

import { describe, expect, test } from "vitest";

const A = [
  [2, 3, 4],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const b = [10, 20, 30, 40];

const equal: "="[] = ["=", "=", "=", "="];

describe("LPSolver", () => {
  describe("toStandardForm", () => {
    test("when all operators are '='", () => {
      const lp = new LPSolver(A, b, ["=", "=", "=", "="]);
      expect(lp.toStandardForm()).toEqual({ A, b, operators: equal });
    });

    test("when operators are '<='", () => {
      const lp = new LPSolver(A, b, ["<=", "<=", "<=", "<="]);
      expect(lp.toStandardForm()).toEqual({
        A: [
          [2, 3, 4, 1, 0, 0, 0],
          [1, 2, 3, 0, 1, 0, 0],
          [4, 5, 6, 0, 0, 1, 0],
          [7, 8, 9, 0, 0, 0, 1],
        ],
        b,
        operators: equal,
      });
    });

    test("when operators are '>='", () => {
      const lp = new LPSolver(A, b, [">=", ">=", ">=", ">="]);
      expect(lp.toStandardForm()).toEqual({
        A: [
          [2, 3, 4, -1, 0, 0, 0],
          [1, 2, 3, 0, -1, 0, 0],
          [4, 5, 6, 0, 0, -1, 0],
          [7, 8, 9, 0, 0, 0, -1],
        ],
        b,
        operators: equal,
      });
    });

    test("when operators are mixed", () => {
      const lp = new LPSolver(A, b, ["=", "<=", ">=", "="]);
      expect(lp.toStandardForm()).toEqual({
        A: [
          [2, 3, 4, 0, 0],
          [1, 2, 3, 1, 0],
          [4, 5, 6, 0, -1],
          [7, 8, 9, 0, 0],
        ],
        b,
        operators: equal,
      });
    });
  });

  describe("getFullRankMatrices", () => {
    test("when columns is less than rows", () => {
      const lp = new LPSolver(
        [
          [2, 3],
          [1, 2],
          [4, 5],
          [7, 8],
        ],
        [10, 20, 30, 40],
        equal
      );
      expect(() => lp.getFullRankMatrices()).toThrowError(
        "Invalid input of size 4 \xd7 2"
      );
    });

    test("when matrix is square", () => {
      const lp = new LPSolver(
        [
          [2, 3, 4],
          [1, 2, 3],
          [4, 5, 7],
        ],
        [10, 20, 30],
        ["=", "=", "="]
      );
      expect(lp.getFullRankMatrices()).toEqual([
        [
          [2, 3, 4],
          [1, 2, 3],
          [4, 5, 7],
        ],
      ]);
    });
  });
});
