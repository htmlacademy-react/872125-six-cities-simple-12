import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../../types/offers';
import {SortItem} from '../../../types/offersSort';
import {APIRoute, APIStatus, NameSpace, OffersSortMap} from '../../../consts';
import {createAPI} from '../../../services/api';
import {ApiStatus} from '../../../types/apiStatus';
import {toast} from 'react-toastify';

type SelectedOfferId = number | null;

type OffersSliceState = {
  offers: Offer[];
  offerOnId: Offer | null;
  sortItem: SortItem;
  selectedOfferId: SelectedOfferId;
  apiStatus: ApiStatus;
}

export const fetchOffers = createAsyncThunk<Offer[], undefined>(
  'offer/fetchOffers',
  async () => {
    const api = createAPI();
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferOnId = createAsyncThunk<Offer, number>(
  'offer/fetchOfferOnId',
  async (id) => {
    const api = createAPI();
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);


const initialState: OffersSliceState = {
  offers: [],
  offerOnId: null,
  sortItem: OffersSortMap[0],
  selectedOfferId: null,
  apiStatus: APIStatus.Loading
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setSortItem: (state, action: PayloadAction<SortItem>) => {
      state.sortItem = action.payload;
    },
    setSelectedOffer: (state, action: PayloadAction<SelectedOfferId>) => {
      state.selectedOfferId = action.payload;
    },
    clearOfferOnId: (state) => {
      state.offerOnId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state: OffersSliceState) => {
        state.apiStatus = APIStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state: OffersSliceState, action) => {
        state.offers = action.payload;
        state.apiStatus = APIStatus.Success;
      })
      .addCase(fetchOffers.rejected, (state: OffersSliceState) => {
        state.offers = [];
        state.apiStatus = APIStatus.Error;
        toast.warn('Ошибка загрузки предложений');
      })
      .addCase(fetchOfferOnId.pending, (state: OffersSliceState) => {
        state.apiStatus = APIStatus.Loading;
      })
      .addCase(fetchOfferOnId.fulfilled, (state: OffersSliceState, action) => {
        state.offerOnId = action.payload;
        state.apiStatus = APIStatus.Success;
      })
      .addCase(fetchOfferOnId.rejected, (state: OffersSliceState) => {
        state.offerOnId = null;
        state.apiStatus = APIStatus.Error;
        toast.warn('Ошибка загрузки предложения');
      });
  }
});
export const {setSortItem, setSelectedOffer, clearOfferOnId} = offersSlice.actions;
export default offersSlice.reducer;
