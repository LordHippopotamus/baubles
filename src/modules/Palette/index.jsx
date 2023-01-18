import { Palette as PaletteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import ColorList from './ColorList';
import { usePaletteStore } from './paletteStore';

const Palette = () => {
  const color = usePaletteStore(state => state.getSelectedColor());
  const [open, setOpen] = useState(false);

  return (
    <>
      <ColorList open={open} />
      <IconButton
        onClick={() => setOpen(prev => !prev)}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        size="large"
      >
        <PaletteIcon sx={{ color, transition: '0.3s' }} fontSize="large" />
      </IconButton>
    </>
  );
};

export default Palette;
