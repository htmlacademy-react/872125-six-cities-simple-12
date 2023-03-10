import { FC } from 'react';

type PropertyRatingProps = {
  point: number | undefined;
}
export const PropertyRating: FC<PropertyRatingProps> = ({point}) => {

  const pointsToPercent = (pointAmount: number | undefined) => {
    if (pointAmount) {
      const percent = pointAmount * 20;
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
export default PropertyRating;
