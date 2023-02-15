import { Add, Circle } from '@mui/icons-material';
import { Grow, IconButton } from '@mui/material';
import { usePaletteStore } from 'hooks';

const ColorButton = ({ open, id, color, handleColorModal, handleContextMenu, index, array }) => {
  const selectColor = usePaletteStore(state => state.selectColor);

  return (
    <Grow in={open} {...(open ? { timeout: (array.length - 1 - index) * 100 } : {})}>
      {color ? (
        <IconButton
          size="large"
          onContextMenu={event => handleContextMenu(event, id)}
          onClick={() => selectColor(id)}
        >
          <Circle sx={{ color }} fontSize="large" />
        </IconButton>
      ) : (
        <IconButton size="large" onClick={() => handleColorModal(id)}>
          <Add fontSize="large" />
        </IconButton>
      )}
    </Grow>
  );
};

export default ColorButton;
