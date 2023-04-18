import { FC } from 'react';
import { pointsToPercent } from '../../utils/utils';

type RatingPlaceProps = {
  point: number;
}
export const RatingPlace: FC<RatingPlaceProps> = ({point}) => (
  <div className="place-card__rating rating">
    <div className="place-card__stars rating__stars">
      <span style={{width: pointsToPercent(point)}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  </div>
);
