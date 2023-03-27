import { Menu, MenuItem } from '@mui/material';
import { useSelectColor, usePickColor } from 'hooks/editor';

const ContextMenu = ({ anchor, handleClose, handleColorModal }) => {
  const selectColor = useSelectColor();
  const pickColor = usePickColor();

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
          pickColor(anchor.colorId, null);
          handleClose();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
