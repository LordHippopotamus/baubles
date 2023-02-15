import { Box } from '@mui/material';
import { usePaletteStore } from 'hooks';
import { useState } from 'react';
import ColorModal from './ColorModal';
import ColorButton from './ColorButton';
import ContextMenu from './ContextMenu';

const ColorList = ({ open }) => {
  const palette = usePaletteStore(state => state.getPalette());

  const [colorModal, setColorModal] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const handleColorModal = id => setColorModal(id);
  const handleContextMenu = (event, id) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            colorId: id,
          }
        : null
    );
  };

  return (
    <>
      <Box
        position="absolute"
        bottom={16}
        right={16}
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
        gap={1}
      >
        {palette.map(({ id, color }, index, array) => (
          <ColorButton
            open={open}
            color={color}
            id={id}
            handleColorModal={handleColorModal}
            handleContextMenu={handleContextMenu}
            index={index}
            array={array}
            key={id}
          />
        ))}
      </Box>

      <ColorModal colorModal={colorModal} handleColorModal={handleColorModal} />

      <ContextMenu
        anchor={contextMenu}
        handleClose={() => setContextMenu(null)}
        handleColorModal={handleColorModal}
      />
    </>
  );
};

export default ColorList;
