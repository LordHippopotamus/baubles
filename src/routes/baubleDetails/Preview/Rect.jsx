import { useTheme } from '@mui/material';

const Rect = ({ x, y, color }) => {
  const { palette } = useTheme();

  return (
    <path
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
