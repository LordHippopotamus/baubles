import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import { useSelectedColor } from 'hooks/editor';
import ColorList from './ColorList';

const Palette: FC = () => {
  const color = useSelectedColor();
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
