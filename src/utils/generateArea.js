export const generateArea = (columns, rows) => {
  const area = [];

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      area.push({ x, y, color: null });
    }
  }

  return area;
};
