import { Outlet } from 'react-router-dom';
import { useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navigation from 'modules/Navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

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

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Root;
