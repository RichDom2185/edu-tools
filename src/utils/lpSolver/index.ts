import { cloneDeep } from "es-toolkit";
import { combinations } from "./combinations";
import { isMatrixInvertible, transpose } from "./matrix";

class LPSolver {
  private A: number[][];
  private b: number[];
  private operators: Array<"=" | "<=" | ">=">;

  constructor(A: number[][], b: number[], operators: Array<"=" | "<=" | ">=">) {
    if (A.length !== b.length || A.length !== operators.length) {
      throw new Error("Invalid input");
    }
    this.A = cloneDeep(A);
    this.b = cloneDeep(b);
    this.operators = cloneDeep(operators);
  }

  toStandardForm(): {
    A: number[][];
    b: number[];
    operators: Array<"=" | "<=" | ">=">;
  } {
    if (this.operators.every((op) => op === "=")) {
      return { A: this.A, b: this.b, operators: this.operators };
    }
    const originalColumns = this.A[0].length;
    let newColumns = 0;
    const padNewColumns = (row: number[]) => {
      for (let i = 0; i < newColumns; i++) {
        row.push(0);
      }
    };
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i] === "<=") {
        padNewColumns(this.A[i]);
        this.A[i].push(1);
        newColumns++;
      } else if (this.operators[i] === ">=") {
        padNewColumns(this.A[i]);
        this.A[i].push(-1);
        newColumns++;
      }
    }
    // Pad the rest of the rows
    for (let i = 0; i < this.A.length; i++) {
      for (let j = this.A[i].length; j < originalColumns + newColumns; j++) {
        this.A[i].push(0);
      }
    }
    this.operators = Array(this.operators.length).fill("=");
    return { A: this.A, b: this.b, operators: this.operators };
  }

  getFullRankMatrices(): number[][][] {
    const rows = this.A.length;
    const columns = this.A[0].length;
    const fullRank: number[][][] = [];

    if (columns < rows) {
      throw new Error(`Invalid input of size ${rows} \xd7 ${columns}`);
    }

    const combos = combinations(columns, rows);
    const transposed = transpose(this.A);
    for (const combo of combos) {
      const matrix: number[][] = [];
      for (const index of combo) {
        matrix.push(cloneDeep(transposed[index]));
      }
      if (isMatrixInvertible(matrix)) {
        fullRank.push(matrix);
      }
    }
    return fullRank;
  }
}

export default LPSolver;
