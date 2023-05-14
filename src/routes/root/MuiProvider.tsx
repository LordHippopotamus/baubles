import { FC, ReactNode, useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useColorMode } from 'hooks/colorMode';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type Props = {
  children: ReactNode;
};

const MuiProvider: FC<Props> = ({ children }) => {
  const [colorMode] = useColorMode();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const systemColorMode = prefersDarkMode ? 'dark' : 'light';

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode === 'auto' ? systemColorMode : colorMode,
        },
      }),
    [systemColorMode, colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiProvider;
