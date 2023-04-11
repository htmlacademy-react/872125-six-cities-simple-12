import {State} from '../../../types/state';
import {NameSpace, OffersSortMap} from '../../../consts';
import {createSelector} from '@reduxjs/toolkit';

export const getAllOffers = (state: State) => state[NameSpace.Offers].offers;

export const getActiveSort = ((state: State) => state[NameSpace.Offers].sortItem);

export const getSelectSortOffers = (city?: string) => createSelector(
  [getAllOffers, getActiveSort],
  (allOffers, activeSort) => {
    const offersOnCity = allOffers.filter((offer) => offer.city.name.toLowerCase() === city?.toLowerCase());
    switch (activeSort.sortProperty) {
      case OffersSortMap[0].sortProperty:
        return offersOnCity;
      case OffersSortMap[1].sortProperty:
        return offersOnCity.sort((a, b) => a.price - b.price);
      case OffersSortMap[2].sortProperty:
        return offersOnCity.sort((a, b) => b.price - a.price);
      case OffersSortMap[3].sortProperty:
        return offersOnCity.sort((a, b) => b.rating - a.rating);
    }
  }
);

export const getSelectedOffer = ((state: State) => state[NameSpace.Offers].selectedOfferId);
export const getApiStatus = ((state: State) => state[NameSpace.Offers].apiStatus);
