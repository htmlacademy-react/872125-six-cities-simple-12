import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './components/App/App';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const Settings = {
  AmountOffers: 5
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App amountOffers={Settings.AmountOffers}/>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
