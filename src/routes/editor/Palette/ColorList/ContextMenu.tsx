import { Menu, MenuItem } from '@mui/material';
import { useSelectColor, usePickColor } from 'hooks/editor';
import { FC, MouseEventHandler, MouseEvent } from 'react';
import { Anchor } from '.';
import { Color } from 'types';

// TODO: fix menu

type Props = {
  anchor: Anchor | null;
  onClose: MouseEventHandler;
  onEditColor: MouseEventHandler;
};

const ContextMenu: FC<Props> = ({ anchor, onClose, onEditColor }) => {
  const selectColor = useSelectColor();
  const pickColor = usePickColor();

  return (
    <Menu
      open={anchor !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchor !== null ? { top: anchor.mouseY, left: anchor.mouseX } : undefined}
    >
      <MenuItem
        onClick={(event: MouseEvent) => {
          selectColor(anchor?.colorId as Color['id']); // anchor can't be null there
          onClose(event);
        }}
      >
        Select
      </MenuItem>
      <MenuItem
        onClick={(event: MouseEvent) => {
          onEditColor(event);
          onClose(event);
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={(event: MouseEvent) => {
          pickColor(anchor?.colorId as Color['id'], null); // anchor can't be null there
          onClose(event);
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
