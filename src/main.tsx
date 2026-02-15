import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import { RouterProvider } from 'react-router-dom';
import router from './routes/mainRouter';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { rtlCache } from './rtlCache';
import { theme } from './theme';
import { CssBaseline } from '@mui/material';

document.body.dir = 'rtl';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    //   <BrowserRouter>
    //     <App />
    //   </BrowserRouter>
    // </StrictMode>,

    <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </CacheProvider>
);
