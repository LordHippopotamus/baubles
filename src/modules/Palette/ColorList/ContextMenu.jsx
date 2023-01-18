import { Menu, MenuItem } from '@mui/material';
import { usePaletteStore } from '../paletteStore';

const ContextMenu = ({ anchor, handleClose, handleColorModal }) => {
  const selectColor = usePaletteStore(state => state.selectColor);
  const changeColor = usePaletteStore(state => state.changeColor);

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
          changeColor(anchor.colorId, null);
          handleClose();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
