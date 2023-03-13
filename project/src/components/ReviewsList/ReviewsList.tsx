import { FC } from 'react';
import { Review } from '../../types/reviews';
import { ReviewItem } from '../ReviewItem/ReviewItem';

type ReviewsListProps = {
  reviews: Review[];
}
export const ReviewsList: FC<ReviewsListProps> = ({reviews}) => (
  <ul className="reviews__list">
    {
      reviews.map((review) => (
        <ReviewItem
          key={review.id}
          name={review.user.name}
          avatarUrl={review.user.avatarUrl}
          comment={review.comment}
          date={review.date}
          rating={review.rating}
        />
      ))
    }
  </ul>
);

