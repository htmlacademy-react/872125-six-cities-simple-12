import {FC} from 'react';
import {setCapitalLetter} from '../../utils/utils';
import {OffersSort} from '../OffersSort/OffersSort';
import {OffersList} from '../OffersList/OffersList';
import {Map} from '../Map/Map';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/store';
import {getApiStatus, getSelectedOffer, getSelectSortOffers} from '../../store/slices/offers.selectors';
import {APIStatus} from '../../consts';
import {Loader} from '../Loader/Loader';
import {HomeEmpty} from '../HomeEmpty/HomeEmpty';

export const CitiesBlock: FC = () => {
  const {city} = useParams();

  const currentOffers = useAppSelector(getSelectSortOffers(city));
  const selectedOffer = useAppSelector(getSelectedOffer);
  const apiStatus = useAppSelector(getApiStatus);

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
              <Map city={currentOffers[0].city.location} offers={currentOffers}
                selectedOfferId={selectedOffer} mapClassName="cities__map"
              />
            </div>
          </div>
        </div>
      ) : <HomeEmpty/>
    );
  }


};