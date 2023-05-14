import { IconButton } from '@mui/material';
import { Brightness4, Brightness7, BrightnessAuto } from '@mui/icons-material';
import { useColorMode } from 'hooks/colorMode';
import { FC } from 'react';

const ThemeToggler: FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const changeColorMode = () => {
    colorMode === 'auto' && setColorMode('dark');
    colorMode === 'dark' && setColorMode('light');
    colorMode === 'light' && setColorMode('auto');
  };

  return (
    <IconButton onClick={changeColorMode} color="inherit">
      {colorMode === 'auto' && <BrightnessAuto />}
      {colorMode === 'dark' && <Brightness4 />}
      {colorMode === 'light' && <Brightness7 />}
    </IconButton>
  );
};

export default ThemeToggler;
