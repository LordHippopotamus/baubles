import { useContext } from 'react';
import { AreaContext } from 'context/editor';

export const useArea = () => {
  const [area] = useContext(AreaContext);
  return area;
};

export const useDraw = () => {
  const [area, setArea] = useContext(AreaContext);
  return (x, y, color) => {
    setArea(area.map(el => ({ ...el, color: el.x === x && el.y === y ? color : el.color })));
  };
};
