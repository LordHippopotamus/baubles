import { useContext } from 'react';
import { ColorModeContext } from 'context/colorMode';

export const useColorMode = () => useContext(ColorModeContext);
