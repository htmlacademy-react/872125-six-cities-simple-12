import {configureStore} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';

import offersSlice from './slices/OffersSlice/offers.slice';
import authSlice from './slices/AuthSlice/auth.slice';
import reviewsSlice from './slices/ReviewsSlice/reviews.slice';


export const store = configureStore({
  reducer: {
    [NameSpace.Offers]: offersSlice,
    [NameSpace.Auth]: authSlice,
    [NameSpace.Reviews]: reviewsSlice,
  },
});

