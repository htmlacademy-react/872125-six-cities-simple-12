import { configureStore } from '@reduxjs/toolkit';
import offersSlice from './slices/offers.slice';
import { NameSpace } from '../consts';


export const store = configureStore({
  reducer: {
    [NameSpace.Offers]: offersSlice
  },
});

