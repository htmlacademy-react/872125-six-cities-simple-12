import { FC } from 'react';
import {Offer} from '../../types/offers';
import CitiesCard from '../CitiesCard/CitiesCard';

type OffersListProps = {
  offers: Offer[];
}
const OffersList: FC<OffersListProps> = ({offers}) => (
  <div className="cities__places-list places__list tabs__content">
    {
      offers.map((offerItem: Offer) => <CitiesCard key={offerItem.id} {...offerItem}/>)
    }
  </div>
);

export default OffersList;
