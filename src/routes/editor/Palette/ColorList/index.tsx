import { Box } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { usePalette } from 'hooks/editor';
import ColorModal from './ColorModal';
import ColorButton from './ColorButton';
import ContextMenu from './ContextMenu';
import { Color } from 'types';

type Props = {
  open: boolean;
};

export type Anchor = {
  mouseX: number;
  mouseY: number;
  colorId: Color['id'];
};

const ColorList: FC<Props> = ({ open }) => {
  const palette = usePalette();

  const [colorModal, setColorModal] = useState<Color['id'] | null>(null);
  const [contextMenu, setContextMenu] = useState<Anchor | null>(null);

  const handleContextMenu = (event: MouseEvent, id: Color['id']) => {
    event.preventDefault();
    setContextMenu(
      contextMenu
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            colorId: id,
          }
        : null
    );
  };

  const closeContextMenu = () => setContextMenu(null);
  const closeColorModal = () => setColorModal(null);

  return (
    <>
      {open && (
        <Box
          position="absolute"
          bottom={16}
          right={16}
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gridTemplateRows="repeat(4, 1fr)"
          gap={1}
        >
          {palette.map(color => (
            <ColorButton
              color={color}
              onPickColor={() => setColorModal(color.id)}
              onContextMenu={(event: MouseEvent) => handleContextMenu(event, color.id)}
              key={color.id}
            />
          ))}
        </Box>
      )}

      <ColorModal colorModal={colorModal} onClose={closeColorModal} />

      <ContextMenu
        anchor={contextMenu}
        onClose={closeContextMenu}
        onEditColor={() => setColorModal(contextMenu?.colorId as Color['id'])} // this function executes only when contextMenu !== null
      />
    </>
  );
};

export default ColorList;
