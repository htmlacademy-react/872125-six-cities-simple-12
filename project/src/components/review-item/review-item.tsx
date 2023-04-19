import { FC } from 'react';
import { RatingPlace } from '../rating-place/rating-place';
import Moment from 'react-moment';
import { YEAR_AND_MONTH_FORMAT } from '../../consts';

type ReviewItemProps = {
  comment: string;
  date: string;
  rating: number;
  name: string;
  avatarUrl: string;
}
export const ReviewItem: FC<ReviewItemProps> = ({
  avatarUrl,
  date,
  rating,
  comment,
  name
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar"
          style={{height: '100%', objectFit: 'cover'}}
          src={avatarUrl}
          width="54"
          height="54"
          alt={`${name} avatar`}
        />
      </div>
      <span className="reviews__user-name">
        {name}
      </span>
    </div>
    <div className="reviews__info">
      <RatingPlace point={rating}/>
      <p className="reviews__text">
        {comment}
      </p>
      <Moment className="reviews__time" format={YEAR_AND_MONTH_FORMAT}>{date}</Moment>
    </div>
  </li>
);

