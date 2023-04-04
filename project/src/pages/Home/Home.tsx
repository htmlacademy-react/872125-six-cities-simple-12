import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/store';
import { setCapitalLetter } from '../../utils/utils';

import { APIStatus, CITIES } from '../../consts';
import { OffersList } from '../../components/OffersList/OffersList';
import { Map } from '../../components/Map/Map';
import { OffersSort } from '../../components/OffersSort/OffersSort';
import { CitiesList } from '../../components/CitiesList/CitiesList';
import { HomeEmpty } from '../../components/HomeEmpty/HomeEmpty';
import {
  getApiStatus,
  getSelectedOffer,
  getSelectSortOffers
} from '../../store/slices/offers.selectors';
import { Loader } from '../../components/Loader/Loader';

export const Home: FC = () => {

  const {city} = useParams();

  const currentOffers = useAppSelector(getSelectSortOffers(city));
  const selectedOffer = useAppSelector(getSelectedOffer);
  const apiStatus = useAppSelector(getApiStatus);

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
        (apiStatus === APIStatus.Loading) && <Loader/>
      }
      {
        (apiStatus === APIStatus.Success && currentOffers?.length) ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentOffers.length} places to stay
                  in {setCapitalLetter(city)}
                </b>
                <OffersSort/>
                <OffersList offers={currentOffers}
                  offersClassNames="cities__places-list tabs__content"
                />
              </section>
              <div className="cities__right-section">
                <Map city={currentOffers[0].city.location} offers={currentOffers}
                  selectedOfferId={selectedOffer} mapClassName="cities__map"
                />
              </div>
            </div>
          </div>
        ) : <HomeEmpty/>
      }
    </main>
  );

};


