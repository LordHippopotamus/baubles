import { create } from 'zustand';

const generateArea = (columns, rows) => {
  const area = [];

  for (let x = 1; x <= columns; x++) {
    for (let y = 1; y <= rows; y++) {
      area.push({ x, y, color: null });
    }
  }

  return area;
};

export const useEditorStore = create(set => ({
  area: generateArea(12, 60),
  tool: 'pan',
  draw: (x, y, color) => {
    set(state => ({
      area: state.area.map(el => ({
        ...el,
        color: el.x === x && el.y === y ? color : el.color,
      })),
    }));
  },
  changeTool: tool => {
    set({ tool });
  },
}));
