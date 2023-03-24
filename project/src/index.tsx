import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import 'leaflet/dist/leaflet.css';

import {App} from './components/App/App';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import { neighboursOffers } from './mocks/neighboursOffers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App offers={offers} reviews={reviews} neighboursOffers={neighboursOffers}/>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
