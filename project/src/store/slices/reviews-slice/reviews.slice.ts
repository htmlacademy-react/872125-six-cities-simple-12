import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {APIRoute, APIStatus, NameSpace} from '../../../consts';

import {Review} from '../../../types/reviews';
import {createAPI} from '../../../services/api';
import {toast} from 'react-toastify';
import {ReviewDataWithId} from '../../../components/reviews-form/reviews-form';


type ReviewsSliceState = {
  reviews: Review[];
  apiStatus: {
    reviews: APIStatus;
    reviewForm: APIStatus;
  };
}

export const fetchReviewsOnId = createAsyncThunk<Review[], number>(
  'offer/fetchReviewsOnId',
  async (id) => {
    const api = createAPI();
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const sendReview = createAsyncThunk<Review[], ReviewDataWithId>(
  'offer/sendReview',
  async ({id, reviewData}) => {
    const api = createAPI();
    const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {
      ...reviewData
    });
    return data;
  }
);

const initialState: ReviewsSliceState = {
  reviews: [],
  apiStatus: {
    reviews: APIStatus.Success,
    reviewForm: APIStatus.Success
  }
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsOnId.pending, (state: ReviewsSliceState) => {
        state.apiStatus.reviews = APIStatus.Loading;
      })
      .addCase(fetchReviewsOnId.fulfilled, (state: ReviewsSliceState, action) => {
        state.reviews = action.payload;
        state.apiStatus.reviews = APIStatus.Success;
      })
      .addCase(fetchReviewsOnId.rejected, (state: ReviewsSliceState) => {
        state.reviews = [];
        state.apiStatus.reviews = APIStatus.Error;
        toast.warn('Ошибка загрузки комментариев');
      })
      .addCase(sendReview.fulfilled, (state: ReviewsSliceState, action) => {
        state.reviews = action.payload;
        state.apiStatus.reviewForm = APIStatus.Success;
      })
      .addCase(sendReview.pending, (state: ReviewsSliceState) => {
        state.apiStatus.reviewForm = APIStatus.Loading;
      })
      .addCase(sendReview.rejected, (state) => {
        toast.warn('Ошибка отправки комментария');
        state.apiStatus.reviewForm = APIStatus.Error;
      });
  }

});
export default reviewsSlice.reducer;
