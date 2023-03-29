import { FC } from 'react';
import cn from 'classnames';

import { Offer } from '../../types/offers';
import { CitiesCard } from '../CitiesCard/CitiesCard';


type OffersListProps = {
  offers: Offer[];
  offersClassNames: string;
}
export const OffersList: FC<OffersListProps> = ({offers, offersClassNames}) => (
  <div className={cn('places__list', offersClassNames) } >
    {
      offers.map((offerItem: Offer) => (<CitiesCard key={offerItem.id} {...offerItem}/>)
      )
    }
  </div>
);

