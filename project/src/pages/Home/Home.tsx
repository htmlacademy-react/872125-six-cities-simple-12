import { FC, useEffect, useState } from 'react';
import {Helmet} from 'react-helmet-async';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {OffersList} from '../../components/OffersList/OffersList';
import {Offer} from '../../types/offers';
import {Map} from '../../components/Map/Map';
import {OffersSort} from '../../components/OffersSort/OffersSort';
import { selectOffersOnCity, setAllOffers } from '../../store/slices/offersSlice';
import { CitiesList } from '../../components/CitiesList/CitiesList';
import {CITIES} from '../../consts';


export const Home: FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const dispatch = useAppDispatch();

  const currentOffers = useAppSelector(selectOffersOnCity('Paris') );
  const activeCity = useAppSelector((state) => state.offers.city);

  useEffect(() => {
    dispatch(setAllOffers());
  },[]);

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList cities={CITIES} activeCity={activeCity}/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in Amsterdam</b>
            <OffersSort/>
            <OffersList offers={currentOffers} onOfferHover={setSelectedOffer} offersClassNames='cities__places-list tabs__content'/>
          </section>
          <div className="cities__right-section">
            <Map city={currentOffers[0].city.location} offers={currentOffers} selectedOffer={selectedOffer} mapClassName='cities__map'/>
          </div>
        </div>
      </div>
    </main>
  );
};


