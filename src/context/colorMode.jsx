import { createContext, useState } from 'react';

export const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState('auto');

  return (
    <ColorModeContext.Provider value={[colorMode, setColorMode]}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
