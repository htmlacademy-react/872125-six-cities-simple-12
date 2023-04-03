import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';
import { SortItem } from '../../types/offersSort';
import { APIRoute, APIStatus, OffersSortMap } from '../../consts';
import { createAPI } from '../../services/api';
import { ApiStatus } from '../../types/apiStatus';

type SelectedOfferId = number | null;

type OffersSliceState = {
  offers: Offer[];
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


const initialState: OffersSliceState = {
  offers: [],
  sortItem: OffersSortMap[0],
  selectedOfferId: null,
  apiStatus: APIStatus.Loading
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setSortItem: (state, action: PayloadAction<SortItem>) => {
      state.sortItem = action.payload;
    },
    setSelectedOffer: (state, action: PayloadAction<SelectedOfferId>) => {
      state.selectedOfferId = action.payload;
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
      });
  }
});

export const { setSortItem, setSelectedOffer} = offersSlice.actions;

export const selectSortOffers = (city?: string ) => (state: State) => {
  const offersOnCity = state.offers.offers.filter((offer) => offer.city.name.toLowerCase() === city?.toLowerCase());
  switch (state.offers.sortItem.sortProperty) {
    case OffersSortMap[0].sortProperty:
      return offersOnCity;
    case OffersSortMap[1].sortProperty:
      return offersOnCity.sort((a, b) => a.price - b.price);
    case OffersSortMap[2].sortProperty:
      return offersOnCity.sort((a, b) => b.price - a.price);
    case OffersSortMap[3].sortProperty:
      return offersOnCity.sort((a, b) => b.rating - a.rating);
  }
};


export default offersSlice.reducer;
