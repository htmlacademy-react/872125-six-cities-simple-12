import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';
import { SortItem } from '../../types/offersSort';
import { offers } from '../../mocks/offers';
import { OffersSortMap } from '../../consts';

type OffersSliceState = {
  offers: Offer[];
  sortItem: SortItem;
}

const initialState: OffersSliceState = {
  offers: [],
  sortItem: OffersSortMap[0]
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setAllOffers: (state) => {
      state.offers = offers;
    },
    setSortItem: (state, action: PayloadAction<SortItem>) => {
      state.sortItem = action.payload;
    }
  },
});

export const {setAllOffers, setSortItem} = offersSlice.actions;

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
