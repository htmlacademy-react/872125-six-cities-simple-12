import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {ReviewRating} from '../review-rating/review-rating';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {ReviewData} from '../../types/reviews';
import {sendReview} from '../../store/slices/reviews-slice/reviews.slice';
import { APIStatus, DEFAULT_RATING, ReviewLengthValidation } from '../../consts';
import cn from 'classnames';
import styles from './index.module.css';
import {getApiStatusReviewsForm} from '../../store/slices/reviews-slice/reviews.selectors';


type ReviewsFormProps = {
  propertyId: number;
}

export type ReviewDataWithId = {
  reviewData: ReviewData;
  id: number;
}

export const ReviewsForm: FC<ReviewsFormProps> = ({propertyId}) => {

  const dispatch = useAppDispatch();
  const formApiStatus = useAppSelector(getApiStatusReviewsForm);

  const [reviewData, setReviewFormData] = useState<ReviewData>({
    rating: DEFAULT_RATING,
    comment: ''
  });

  const {rating, comment} = reviewData;

  const isValid = rating > DEFAULT_RATING && comment.length >= ReviewLengthValidation.Min && comment.length <= ReviewLengthValidation.Max;

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
    setReviewFormData({comment: '', rating: DEFAULT_RATING});
    e.currentTarget.reset();
  };
  return (
    <form className={cn('reviews__form form', {[styles.formDisabled]: formApiStatus === APIStatus.Loading})}
      onSubmit={handleSubmitReview}
    >
      <label className="reviews__label form__label" htmlFor="comment">Your review</label>
      <ReviewRating fieldChangeHandler={fieldChangeHandler}/>
      <textarea className="reviews__textarea form__textarea" onChange={fieldChangeHandler} value={reviewData.comment}
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className={cn('reviews__submit form__submit button', {[styles.btnDisabled]: !isValid})}
          type="submit"
        >Submit
        </button>
      </div>
    </form>
  );
};

