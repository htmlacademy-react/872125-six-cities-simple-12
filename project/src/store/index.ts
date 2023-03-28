import { configureStore } from '@reduxjs/toolkit';
import offersSlice from './slices/offersSlice';


export const store = configureStore({
  reducer: {
    offers: offersSlice
  },
});

