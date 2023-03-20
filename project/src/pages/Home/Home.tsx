import {FC, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {OffersList} from '../../components/OffersList/OffersList';
import {Offer} from '../../types/offers';
import {Map} from '../../components/Map/Map';
import {Link} from 'react-router-dom';
import {OffersSort} from '../../components/OffersSort/OffersSort';

type HomeProps = {
  offers: Offer[];
}
export const Home: FC<HomeProps> = ({offers}) => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <Link className="locations__item-link tabs__item" to="/">
                <span>Paris</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link className="locations__item-link tabs__item" to="/">
                <span>Cologne</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link className="locations__item-link tabs__item" to="/">
                <span>Brussels</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link className="locations__item-link tabs__item tabs__item--active" to="/">
                <span>Amsterdam</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link className="locations__item-link tabs__item" to="/">
                <span>Hamburg</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link className="locations__item-link tabs__item" to="#">
                <span>Dusseldorf</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in Amsterdam</b>
            <OffersSort/>
            <OffersList offers={offers} onOfferHover={setSelectedOffer} offersClassNames='cities__places-list tabs__content'/>
          </section>
          <div className="cities__right-section">

            <Map city={offers[0].city.location} offers={offers} selectedOffer={selectedOffer} mapClassName='cities__map'/>

          </div>
        </div>
      </div>
    </main>
  );
};


