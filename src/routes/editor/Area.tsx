import { useSelectedTool, useSelectedColor, useDraw, useArea } from 'hooks/editor';
import Preview from 'components/Preview';
import { MouseEvent, TouchEvent, useEffect } from 'react';

const Area = () => {
  const area = useArea();
  const tool = useSelectedTool();
  const draw = useDraw();
  const selectedColor = useSelectedColor();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleMove = (event: MouseEvent & { target: SVGPathElement }) => {
    if (event.buttons === 1 && event.target.tagName === 'path') {
      const [x, y] = event.target.id.split(';');
      if (tool === 'brush') draw(+x, +y, selectedColor);
      if (tool === 'eraser') draw(+x, +y, null);
    }
  };

  const handleClick = (event: MouseEvent & { target: SVGPathElement }) => {
    const [x, y] = event.target.id.split(';');
    if (tool === 'brush') draw(+x, +y, selectedColor);
    if (tool === 'eraser') draw(+x, +y, null);
  };

  const handleTouch = (event: TouchEvent & { target: SVGPathElement }) => {
    const target = document.elementFromPoint(
      event.changedTouches[0].clientX,
      event.changedTouches[0].clientY
    );
    if (!target) return;
    const [x, y] = target.id.split(';');
    if (tool === 'brush') draw(+x, +y, selectedColor);
    if (tool === 'eraser') draw(+x, +y, null);
  };

  return (
    <Preview
      area={area}
      wrapperProps={{ disabled: tool !== 'pan' }}
      svgProps={{ onMouseMove: handleMove, onTouchMove: handleTouch }}
      rectProps={{ onClick: handleClick }}
    />
  );
};

export default Area;
