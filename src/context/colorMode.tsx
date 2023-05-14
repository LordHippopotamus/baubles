import { FC, ReactNode, Dispatch, SetStateAction, createContext, useState } from 'react';

type ColorMode = 'auto' | 'dark' | 'light';

type ColorModeContext = [ColorMode, Dispatch<SetStateAction<ColorMode>>];

type Props = {
  children: ReactNode;
};

export const ColorModeContext = createContext<ColorModeContext>(['auto', () => undefined]);

const ColorModeProvider: FC<Props> = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('auto');

  return (
    <ColorModeContext.Provider value={[colorMode, setColorMode]}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
