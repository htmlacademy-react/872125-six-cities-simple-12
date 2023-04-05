import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {App} from './components/App/App';
import {ToastContainer} from 'react-toastify';
import {reviews} from './mocks/reviews';
import { neighboursOffers } from './mocks/neighboursOffers';
import { Provider } from 'react-redux';
import { store } from './store';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ToastContainer />
          <App reviews={reviews} neighboursOffers={neighboursOffers}/>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </Provider>
);
