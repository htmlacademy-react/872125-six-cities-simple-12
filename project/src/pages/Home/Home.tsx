import {FC, useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {setCapitalLetter} from '../../utils/utils';

import {Offer} from '../../types/offers';
import {CITIES} from '../../consts';
import { selectSortOffers, setAllOffers } from '../../store/slices/offersSlice';
import {OffersList} from '../../components/OffersList/OffersList';
import {Map} from '../../components/Map/Map';
import {OffersSort} from '../../components/OffersSort/OffersSort';
import {CitiesList} from '../../components/CitiesList/CitiesList';
import { HomeEmpty } from '../../components/HomeEmpty/HomeEmpty';

export const Home: FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const {city} = useParams();

  const currentOffers = useAppSelector(selectSortOffers(city));

  const dispatch = useAppDispatch();

  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {

    if (!isRenderedRef.current) {
      dispatch(setAllOffers());
    }

    isRenderedRef.current = true;

  }, [currentOffers, dispatch]);

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList cities={CITIES} activeCity={city}/>
        </section>
      </div>
      {
        currentOffers?.length ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentOffers.length} places to stay in {setCapitalLetter(city)}</b>
                <OffersSort/>
                <OffersList offers={currentOffers} onOfferHover={setSelectedOffer}
                  offersClassNames="cities__places-list tabs__content"
                />
              </section>
              <div className="cities__right-section">
                <Map city={currentOffers[0].city.location} offers={currentOffers}
                  selectedOffer={selectedOffer} mapClassName="cities__map"
                />
              </div>
            </div>
          </div>
        ) : <HomeEmpty/>
      }
    </main>
  );
};


