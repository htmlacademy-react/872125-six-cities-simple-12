import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIRoute, APIStatus, NameSpace } from '../../../consts';

import { Review} from '../../../types/reviews';
import { ApiStatus } from '../../../types/apiStatus';
import { createAPI } from '../../../services/api';
import { toast } from 'react-toastify';
import { ReviewDataWithId } from '../../../components/ReviewsForm/ReviewsForm';


type ReviewsSliceState = {
  reviews: Review[];
  apiStatus: ApiStatus;
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
  apiStatus: APIStatus.Loading
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsOnId.pending, (state: ReviewsSliceState) => {
        state.apiStatus = APIStatus.Loading;
      })
      .addCase(fetchReviewsOnId.fulfilled, (state: ReviewsSliceState, action) => {
        state.reviews = action.payload;
        state.apiStatus = APIStatus.Success;
      })
      .addCase(fetchReviewsOnId.rejected, (state: ReviewsSliceState) => {
        state.reviews = [];
        state.apiStatus = APIStatus.Error;
        toast.warn('Ошибка загрузки комментариев');
      })
      .addCase(sendReview.fulfilled, (state: ReviewsSliceState, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReview.rejected, () => {
        toast.warn('Ошибка отправки комментария');
      });
  }

});
export default reviewsSlice.reducer;
