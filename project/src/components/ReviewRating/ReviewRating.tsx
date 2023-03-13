import { ChangeEvent, FC } from 'react';


type ReviewRatingProps = {
  fieldChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type ReviewStarElement = {
  value: number;
  title: string;
}

const ReviewStars: ReviewStarElement[] = [
  {value: 5, title: 'perfect'},
  {value: 4, title: 'good'},
  {value: 3, title: 'not bad'},
  {value: 2, title: 'terribly'},
  {value: 1, title: 'badly'},
];

export const ReviewRating: FC<ReviewRatingProps> = ({fieldChangeHandler}) => (
  <div className="reviews__rating-form form__rating">
    {
      ReviewStars.map((star) => (
        <div key={star.title}>
          <input className="form__rating-input visually-hidden"
            onChange={fieldChangeHandler}
            name="rating"
            value={star.value}
            id={`${star.value}-stars`}
            type="radio"
          />
          <label htmlFor={`${star.value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={star.title}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
      ))
    }
  </div>
);

