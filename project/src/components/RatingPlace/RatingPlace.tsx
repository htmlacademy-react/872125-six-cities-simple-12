import { FC } from 'react';
import { ONE_POINT } from '../../consts';

type RatingPlaceProps = {
  point: number;
}
export const RatingPlace: FC<RatingPlaceProps> = ({point}) => {
  const pointsToPercent = (pointAmount: number) => {
    const percent = pointAmount * ONE_POINT;
    return `${percent.toString()}%`;
  };

  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{width: pointsToPercent(point)}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
};
