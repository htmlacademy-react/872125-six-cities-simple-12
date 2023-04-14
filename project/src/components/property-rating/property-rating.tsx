import { FC } from 'react';
import { pointsToPercent } from '../../utils/utils';

type PropertyRatingProps = {
  point?: number;
}
export const PropertyRating: FC<PropertyRatingProps> = ({point}) => (
  <div className="property__rating rating">
    <div className="property__stars rating__stars">
      <span style={{width: pointsToPercent(point)}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
    <span className="property__rating-value rating__value">{point}</span>
  </div>
);
