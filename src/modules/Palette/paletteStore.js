import { create } from 'zustand';

export const usePaletteStore = create((set, get) => ({
  palette: [
    { id: 1, selected: false, color: null },
    { id: 2, selected: false, color: null },
    { id: 3, selected: false, color: null },
    { id: 4, selected: false, color: null },
    { id: 5, selected: false, color: null },
    { id: 6, selected: false, color: null },
    { id: 7, selected: false, color: null },
    { id: 8, selected: false, color: null },
    { id: 9, selected: false, color: null },
  ],
  getSelectedColor() {
    const palette = get().palette;
    return palette.find(el => el.selected);
  },
  changeColor: (id, color) => {
    const palette = get().palette;
    const selectedColorIndex = palette.findIndex(el => el.id === id);
    palette[selectedColorIndex].color = color;
    palette[selectedColorIndex].selected = color ? true : false;
    set({ palette });
  },
  selectColor: id => {
    const palette = get().palette;
    palette.map(el => (el.selected = el.id === id));
    set({ palette });
  },
}));
