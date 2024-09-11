/**
 * Generates all possible combinations N choose p.
 */
export const combinations = (N: number, p: number) => {
  const combinations: number[][] = [];
  const generate = (current: number[], index: number) => {
    if (current.length === p) {
      combinations.push(current);
      return;
    }
    for (let i = index; i < N; i++) {
      generate([...current, i], i + 1);
    }
  };
  generate([], 0);
  return combinations;
};
