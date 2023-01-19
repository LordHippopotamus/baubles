import { create } from 'zustand';

export const usePaletteStore = create((set, get) => ({
  _palette: [
    { id: 1, color: null },
    { id: 2, color: null },
    { id: 3, color: null },
    { id: 4, color: null },
    { id: 5, color: null },
    { id: 6, color: null },
    { id: 7, color: null },
    { id: 8, color: null },
    { id: 9, color: null },
  ],

  _color: { id: null, color: null },

  getColor: () => get()._color.color,
  getPalette: () => get()._palette,

  changeColor: (id, color) => {
    const _palette = get()._palette;
    const selectedColor = _palette.find(el => el.id === id);
    selectedColor.color = color;
    set({ _palette });
    get().selectColor(id);
  },

  resetColor: id => {
    const _palette = get()._palette;
    const selectedColor = _palette.find(el => el.id === id);
    selectedColor.color = null;
    set({ _palette });
    if (id == get()._color.id) get().selectColor(id);
  },

  selectColor: id => {
    const _palette = get()._palette;
    let _color = _palette.find(el => el.id === id);

    if (!_color.color) {
      const anyColor = _palette.find(el => el.color);
      _color = anyColor || { id: null, color: null };
    }

    set({ _color });
  },
}));
