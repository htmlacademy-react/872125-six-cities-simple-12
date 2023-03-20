import { FC } from 'react';
import cn from 'classnames';

import { Offer } from '../../types/offers';
import { CitiesCard } from '../CitiesCard/CitiesCard';


type OffersListProps = {
  offers: Offer[];
  onOfferHover?: (offer:Offer | null) => void;
  offersClassNames: string;
}
export const OffersList: FC<OffersListProps> = ({offers, onOfferHover, offersClassNames}) => (
  <div className={cn('places__list', offersClassNames) } >
    {
      offers.map((offerItem: Offer) => (
        <CitiesCard
          key={offerItem.id}
          {...offerItem}
          onMouseEnter={() => onOfferHover?.(offerItem)}
          onMouseLeave={() => onOfferHover?.(null) }
        />)
      )
    }
  </div>
);

