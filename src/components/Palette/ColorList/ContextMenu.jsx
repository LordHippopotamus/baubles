import { Menu, MenuItem } from '@mui/material';
import { usePaletteStore } from 'hooks';

const ContextMenu = ({ anchor, handleClose, handleColorModal }) => {
  const selectColor = usePaletteStore(state => state.selectColor);
  const resetColor = usePaletteStore(state => state.resetColor);

  return (
    <Menu
      open={anchor !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={anchor !== null ? { top: anchor.mouseY, left: anchor.mouseX } : undefined}
    >
      <MenuItem
        onClick={() => {
          selectColor(anchor.colorId);
          handleClose();
        }}
      >
        Select
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleColorModal(anchor.colorId);
          handleClose();
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          resetColor(anchor.colorId);
          handleClose();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
