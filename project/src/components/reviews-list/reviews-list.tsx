import { FC } from 'react';
import { Review } from '../../types/reviews';
import { ReviewItem } from '../review-item/review-item';
import { REVIEW_COUNT } from '../../consts';

type ReviewsListProps = {
  reviews: Review[];
}
export const ReviewsList: FC<ReviewsListProps> = ({reviews}) => {
  if (!reviews.length) {
    return <h3>There are no comments here yet. Be the first!</h3>;
  }
  return (
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
        )).slice(0, REVIEW_COUNT)
      }
    </ul>
  );
};

