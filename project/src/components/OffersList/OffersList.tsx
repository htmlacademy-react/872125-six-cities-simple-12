import { FC, useState } from 'react';
import { Offer } from '../../types/offers';
import { CitiesCard } from '../CitiesCard/CitiesCard';

type OffersListProps = {
  offers: Offer[];
}
export const OffersList: FC<OffersListProps> = ({offers}) => {
  const [, setActiveCard] = useState<Offer | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offerItem: Offer) => (
          <CitiesCard
            key={offerItem.id}
            {...offerItem}
            onMouseEnter={() => setActiveCard(offerItem)}
            onMouseLeave={() => setActiveCard(null) }
          />)
        )
      }
    </div>
  );
};

