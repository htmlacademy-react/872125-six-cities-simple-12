import {FC, MouseEventHandler} from 'react';
import {Link} from 'react-router-dom';
import {generatePath} from 'react-router-dom';

import PremiumMark from '../PremiumMark/PremiumMark';

import styles from './index.module.css';
import RatingPlace from '../RatingPlace/RatingPlace';
import {AppRoute} from '../../consts';

type CitiesCardProps = {
  id: number;
  type: string;
  price: number;
  title: string;
  rating: number;
  previewImage: string;
  isPremium: boolean;
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
}
const CitiesCard: FC<CitiesCardProps> = ({
  id,
  type,
  price,
  title,
  rating,
  previewImage,
  isPremium,
  onMouseEnter,
  onMouseLeave
}) => (
  <article className="cities__card place-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {isPremium && <PremiumMark/>}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={generatePath(AppRoute.Room, {id: id.toString()})}>
        <img className={styles.cardImg} src={previewImage} width="260" height="200"
          alt={title}
        />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>

      </div>
      <RatingPlace point={rating}/>

      <h2 className="place-card__name">
        <Link to={generatePath(AppRoute.Room, {id: id.toString()})}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>

);


export default CitiesCard;
