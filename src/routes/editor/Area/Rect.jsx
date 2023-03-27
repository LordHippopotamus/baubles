import { useTheme } from '@mui/material';
import { useSelectedTool, useDraw, useSelectedColor } from 'hooks/editor';

const Rect = ({ x, y, color }) => {
  const tool = useSelectedTool();
  const draw = useDraw();
  const selectedColor = useSelectedColor();

  const { palette } = useTheme();

  const handleClick = () => {
    switch (tool) {
      case 'brush':
        draw(x, y, selectedColor);
        break;
      case 'eraser':
        draw(x, y, null);
        break;
    }
  };

  return (
    <path
      onClick={handleClick}
      id={x + ';' + y}
      d={`M${x * 100} ${y * 100} H${x * 100 + 100} V${y * 100 + 100} H${x * 100} Z`}
      vectorEffect="non-scaling-stroke"
      fill={color || 'transparent'}
      stroke={palette.action.active}
      strokeWidth={1}
    />
  );
};

export default Rect;
