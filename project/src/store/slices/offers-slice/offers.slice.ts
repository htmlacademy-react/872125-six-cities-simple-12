import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../../types/offers';
import {SortItem} from '../../../types/offers-sort';
import {APIRoute, APIStatus, NameSpace, OffersSortMap} from '../../../consts';
import {createAPI} from '../../../services/api';
import {ApiStatus} from '../../../types/api-status';
import {toast} from 'react-toastify';

type SelectedOfferId = number | null;

type OffersSliceState = {
  offers: Offer[];
  nearbyOffers: Offer[];
  offerOnId: Offer | null;
  sortItem: SortItem;
  selectedOfferId: SelectedOfferId;
  apiStatus: {
    allOffers: ApiStatus;
    property: ApiStatus;
    nearbyOffers: ApiStatus;
  };
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

export const fetchNearbyOffersOnId = createAsyncThunk<Offer[], number>(
  'offer/fetchNearbyOffersOnId',
  async (id) => {
    const api = createAPI();
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    return data;
  }
);


const initialState: OffersSliceState = {
  offers: [],
  nearbyOffers: [],
  offerOnId: null,
  sortItem: OffersSortMap[0],
  selectedOfferId: null,
  apiStatus: {
    allOffers: APIStatus.Loading,
    property: APIStatus.Loading,
    nearbyOffers: APIStatus.Loading
  }
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
        state.apiStatus.allOffers = APIStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state: OffersSliceState, action) => {
        state.offers = action.payload;
        state.apiStatus.allOffers = APIStatus.Success;
      })
      .addCase(fetchOffers.rejected, (state: OffersSliceState) => {
        state.offers = [];
        state.apiStatus.allOffers = APIStatus.Error;
        toast.warn('Ошибка загрузки предложений');
      })
      .addCase(fetchOfferOnId.pending, (state: OffersSliceState) => {
        state.apiStatus.property = APIStatus.Loading;
      })
      .addCase(fetchOfferOnId.fulfilled, (state: OffersSliceState, action) => {
        state.offerOnId = action.payload;
        state.apiStatus.property = APIStatus.Success;
      })
      .addCase(fetchOfferOnId.rejected, (state: OffersSliceState) => {
        state.offerOnId = null;
        state.apiStatus.property = APIStatus.Error;
        toast.warn('Ошибка загрузки предложения');
      })
      .addCase(fetchNearbyOffersOnId.pending, (state: OffersSliceState) => {
        state.apiStatus.nearbyOffers = APIStatus.Loading;
      })
      .addCase(fetchNearbyOffersOnId.fulfilled, (state: OffersSliceState, action) => {
        state.nearbyOffers = action.payload;
        state.apiStatus.nearbyOffers = APIStatus.Success;
      })
      .addCase(fetchNearbyOffersOnId.rejected, (state: OffersSliceState) => {
        state.nearbyOffers = [];
        state.apiStatus.nearbyOffers = APIStatus.Error;
        toast.warn('Ошибка загрузки предложений неподалёку');
      });
  }
});
export const {setSortItem, setSelectedOffer, clearOfferOnId} = offersSlice.actions;
export default offersSlice.reducer;
