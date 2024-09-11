import { describe, expect, test } from "vitest";
import { combinations } from "./combinations";

describe("Combinations", () => {
  test("combinations", () => {
    const expected = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ];
    expect(combinations(4, 2)).toEqual(expected);
  });
});
