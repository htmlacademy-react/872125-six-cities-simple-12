import { FC } from 'react';
import PremiumMark from '../PremiumMark/PremiumMark';

import styles from './index.module.css';

type CitiesCardProps = {
  type: string;
  price: number;
  title: string;
  rating: number;
  image: string;
  isPremium: boolean;
}
const CitiesCard: FC<CitiesCardProps> = ({type, price, title, rating, image, isPremium }) => (
  <article className="cities__card place-card">
    {isPremium && <PremiumMark />}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className={styles.cardImg} src={image} width="260" height="200"
          alt={title}
        />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>

      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: '80%'}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>

);


export default CitiesCard;
