import { useSelectedTool, useSelectedColor, useDraw, useArea } from 'hooks/editor';
import Preview from 'components/Preview';
import { MouseEvent } from 'react';

const Area = () => {
  const area = useArea();
  const tool = useSelectedTool();
  const draw = useDraw();
  const selectedColor = useSelectedColor();

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

  return (
    <Preview
      area={area}
      wrapperProps={{ disabled: tool !== 'pan' }}
      svgProps={{ onMouseMove: handleMove }}
      rectProps={{ onClick: handleClick }}
    />
  );
};

export default Area;
