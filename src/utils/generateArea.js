export const generateArea = (columns, rows) => {
  const area = [];

  for (let x = 1; x <= columns; x++) {
    for (let y = 1; y <= rows; y++) {
      area.push({ x, y, color: null });
    }
  }

  return area;
};
