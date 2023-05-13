import { useContext } from 'react';
import { AreaContext } from 'context/editor';
import { Rect } from 'types';

export const useArea = () => {
  const [area] = useContext(AreaContext);
  return area;
};

export const useDraw = () => {
  const [area, setArea] = useContext(AreaContext);
  return (x: Rect['x'], y: Rect['y'], color: Rect['color']) => {
    setArea(area.map(el => ({ ...el, color: el.x === x && el.y === y ? color : el.color })));
  };
};
