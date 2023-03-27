import { useSelectedTool, useSelectedColor, useDraw, useArea } from 'hooks/editor';
import Rect from './Rect';

const Canvas = ({ scale, translate }) => {
  const area = useArea();
  const tool = useSelectedTool();
  const draw = useDraw();
  const selectedColor = useSelectedColor();

  const handleMove = event => {
    if (event.buttons === 1 && event.target.tagName === 'path') {
      const [x, y] = event.target.id.split(';');
      if (tool === 'brush') draw(+x, +y, selectedColor);
      if (tool === 'eraser') draw(+x, +y, null);
    }
  };

  return (
    <svg
      onMouseMove={handleMove}
      width="100%"
      height="100%"
      viewBox={`0 0 1200 6000`}
      style={{
        transform: `scale(${scale})
                      translate(${translate.x / scale}px, ${translate.y / scale}px)`,
        transformOrigin: '0px 0px',
      }}
    >
      {area.map(el => (
        <Rect key={el.x + ';' + el.y} {...el} />
      ))}
    </svg>
  );
};

export default Canvas;
