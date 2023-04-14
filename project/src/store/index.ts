import {configureStore} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';

import offersSlice from './slices/offers-slice/offers.slice';
import authSlice from './slices/auth-slice/auth.slice';
import reviewsSlice from './slices/reviews-slice/reviews.slice';


export const store = configureStore({
  reducer: {
    [NameSpace.Offers]: offersSlice,
    [NameSpace.Auth]: authSlice,
    [NameSpace.Reviews]: reviewsSlice,
  },
});

