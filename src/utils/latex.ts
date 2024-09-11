export const matrixToLatex = (M: (string | number)[][]) => {
  const top = `\\begin{pmatrix}`;
  const bottom = `\\end{pmatrix}`;

  const rows = [];
  for (let i = 0; i < M.length; i++) {
    const row = M[i].map((val) => val.toString()).join(" & ");
    if (i !== M.length - 1) {
      rows.push(row + " \\\\");
    } else {
      rows.push(row);
    }
  }

  return top + rows.join("\n") + bottom;
};
