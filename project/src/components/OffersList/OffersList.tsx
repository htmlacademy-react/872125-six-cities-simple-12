import { FC } from 'react';
import { Offer } from '../../types/offers';
import { CitiesCard } from '../CitiesCard/CitiesCard';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offer:Offer | null) => void;
}
export const OffersList: FC<OffersListProps> = ({offers, onOfferHover}) => (
  <div className="cities__places-list places__list tabs__content">
    {
      offers.map((offerItem: Offer) => (
        <CitiesCard
          key={offerItem.id}
          {...offerItem}
          onMouseEnter={() => onOfferHover(offerItem)}
          onMouseLeave={() => onOfferHover(null) }
        />)
      )
    }
  </div>
);

