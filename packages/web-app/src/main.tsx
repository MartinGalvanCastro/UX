import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme } from './theme'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux';

import '@fontsource-variable/exo-2';
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>,
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
)
