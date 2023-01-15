import { Outlet } from 'react-router-dom';
import { useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import UserObserver from 'modules/user';
import Navigation from 'modules/Navigation';

const Root = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <UserObserver />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default Root;
