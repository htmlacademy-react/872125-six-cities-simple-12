import { ChangeEvent, FC, useState } from 'react';
import ReviewRating from '../ReviewRating/ReviewRating';


type ReviewData = {
  rating: number;
  review: string;
}
const ReviewsForm: FC = () => {

  const [reviewFormData, setReviewFormData] = useState<ReviewData>({
    rating: 0,
    review: ''
  });

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setReviewFormData({...reviewFormData, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating fieldChangeHandler={fieldChangeHandler}/>
      <textarea className="reviews__textarea form__textarea" onChange={fieldChangeHandler} value={reviewFormData.review} id="review" name="review"
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

export default ReviewsForm;
