import { FC } from 'react';

type RatingPlaceProps = {
  point: number;
}
export const RatingPlace: FC<RatingPlaceProps> = ({point}) => {
  const pointsToPercent = (pointAmount: number) => {
    const percent = pointAmount * 20;
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
export default RatingPlace;
