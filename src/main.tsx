import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';   // was HashRouter
import App from './App';
import './styles/fonts.css';
import { registerPdfFonts } from './features/report-pdf/fonts';
registerPdfFonts();
import './styles/globals.css';
import './styles/print.css';
import './i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { PaletteProvider } from '@/components/palette-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <PaletteProvider>
     <HashRouter>
  <App />
</HashRouter>
      </PaletteProvider>
    </ThemeProvider>
  </React.StrictMode>
);
