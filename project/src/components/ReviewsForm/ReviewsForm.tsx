import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { ReviewRating } from '../ReviewRating/ReviewRating';
import { useAppDispatch } from '../../hooks/store';
import { ReviewData } from '../../types/reviews';
import { sendReview } from '../../store/slices/ReviewsSlice/reviews.slice';


type ReviewsFormProps = {
  propertyId: number;
}

export type ReviewDataWithId = {
  reviewData: ReviewData;
  id: number;
}

export const ReviewsForm: FC<ReviewsFormProps> = ({propertyId}) => {

  const dispatch = useAppDispatch();

  const [reviewData, setReviewFormData] = useState<ReviewData>({
    rating: 0,
    comment: ''
  });

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setReviewFormData({...reviewData, [name]: value});
  };

  const handleSubmitReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewDataWithId: ReviewDataWithId = {
      reviewData,
      id: propertyId,
    };
    dispatch(sendReview(reviewDataWithId));
  };
  return (
    <form className="reviews__form form" onSubmit={handleSubmitReview}>
      <label className="reviews__label form__label" htmlFor="comment">Your review</label>
      <ReviewRating fieldChangeHandler={fieldChangeHandler}/>
      <textarea className="reviews__textarea form__textarea" onChange={fieldChangeHandler} value={reviewData.comment} id="comment" name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
};

