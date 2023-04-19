import {FC} from 'react';
import {setCapitalLetter} from '../../utils/utils';
import {OffersSort} from '../offers-sort/offers-sort';
import {OffersList} from '../offers-list/offers-list';
import {Map} from '../map/map';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/store';
import {getApiStatusAllOffers, getSelectedOffer, getSelectSortOffers} from '../../store/slices/offers-slice/offers.selectors';
import { APIStatus, FIRST_INDEX_ARRAY_ELEMENT } from '../../consts';
import {Loader} from '../loader/loader';
import {HomeEmpty} from '../home-empty/home-empty';

export const CitiesBlock: FC = () => {
  const {city} = useParams();

  const currentOffers = useAppSelector(getSelectSortOffers(city));
  const selectedOffer = useAppSelector(getSelectedOffer);
  const apiStatus = useAppSelector(getApiStatusAllOffers);

  if (apiStatus === APIStatus.Loading) {
    return <Loader/>;
  } else {
    return (
      currentOffers?.length ? (
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
              <Map city={currentOffers[FIRST_INDEX_ARRAY_ELEMENT].city.location} offers={currentOffers}
                selectedOfferId={selectedOffer} mapClassName="cities__map"
              />
            </div>
          </div>
        </div>
      ) : <HomeEmpty/>
    );
  }


};
