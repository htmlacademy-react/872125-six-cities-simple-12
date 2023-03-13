import { FC } from 'react';
import { ONE_POINT } from '../../consts';

type PropertyRatingProps = {
  point?: number;
}
export const PropertyRating: FC<PropertyRatingProps> = ({point}) => {

  const pointsToPercent = (pointAmount?: number) => {
    if (pointAmount) {
      const percent = pointAmount * ONE_POINT;
      return `${percent.toString()}%`;
    } else {
      return '';
    }
  };

  return (
    <div className="property__rating rating">
      <div className="property__stars rating__stars">
        <span style={{width: pointsToPercent(point)}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="property__rating-value rating__value">{point}</span>
    </div>
  );
};
