import { Add, Circle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelectColor } from 'hooks/editor';
import { FC, MouseEventHandler } from 'react';
import { Color } from 'types';

type Props = {
  color: Color;
  onContextMenu: MouseEventHandler;
  onPickColor: MouseEventHandler;
};

const ColorButton: FC<Props> = ({ color, onContextMenu, onPickColor }) => {
  const selectColor = useSelectColor();

  if (color.color) {
    return (
      <IconButton size="large" onClick={() => selectColor(color.id)} onContextMenu={onContextMenu}>
        <Circle sx={{ color: color.color }} fontSize="large" />
      </IconButton>
    );
  }

  return (
    <IconButton size="large" onClick={onPickColor}>
      <Add fontSize="large" />
    </IconButton>
  );
};

export default ColorButton;
