import { useContext } from 'react';
import { PaletteContext } from 'context/editor';
import { Color } from 'types';

export const usePalette = () => {
  const [palette] = useContext(PaletteContext);
  return palette;
};

export const useSelectedColor = () => {
  const [palette] = useContext(PaletteContext);
  const selectedColor = palette.find(el => el.selected);
  return selectedColor?.color || null;
};

export const useSelectColor = () => {
  const [palette, setPalette] = useContext(PaletteContext);

  return (id: number) => setPalette(palette.map(el => ({ ...el, selected: el.id === id })));
};

export const usePickColor = () => {
  const [palette, setPalette] = useContext(PaletteContext);

  return (id: Color['id'], color: Color['color']) => {
    if (color) {
      setPalette(
        palette.map(el =>
          el.id === id ? { ...el, color, selected: true } : { ...el, selected: false }
        )
      );
    } else {
      const lastColor = palette.findLast(el => el.color && el.id !== id);
      setPalette(
        palette.map(el => ({
          ...el,
          color: el.id === id ? color : el.color,
          selected: lastColor?.id === el.id,
        }))
      );
    }
  };
};
