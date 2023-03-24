import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';
import {offers} from '../../mocks/offers';
import {CityName} from '../../types/cities';
import {CITIES} from '../../consts';
import {State} from '../../types/state';


type OffersSliceState = {
  offers: Offer[];
  city: CityName;

}


const initialState: OffersSliceState = {
  offers: [],
  city: CITIES[0]
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setAllOffers: (state) => {
      state.offers = offers;
    },
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    }
  },

});

export const {setAllOffers, setCity} = offersSlice.actions;

export const selectOffersOnCity = (city: string | undefined) => (state: State) => state.offers.offers.filter((offer) => offer.city.name.toLowerCase() === city?.toLowerCase());

export default offersSlice.reducer;
