import { State } from '../../types/state';
import { NameSpace, OffersSortMap } from '../../consts';

export const getAllOffers = (state: State) => state[NameSpace.Offers].offers;
export const getSelectSortOffers = (city?: string ) => (state: State) => {
  const offersOnCity = state[NameSpace.Offers].offers.filter((offer) => offer.city.name.toLowerCase() === city?.toLowerCase());
  switch (state[NameSpace.Offers].sortItem.sortProperty) {
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
export const getActiveSort = ((state: State) => state[NameSpace.Offers].sortItem);
export const getSelectedOffer = ((state: State) => state[NameSpace.Offers].selectedOfferId);
export const getApiStatus = ((state: State) => state[NameSpace.Offers].apiStatus);
