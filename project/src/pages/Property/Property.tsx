import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { uid } from 'uid';
import { useNavigate, useParams } from 'react-router-dom';

import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';

import PropertyRating from '../../components/PropertyRating/PropertyRating';
import ReviewsForm from '../../components/ReviewsForm/ReviewsForm';
import ReviewsList from '../../components/ReviewsList/ReviewsList';


type PropertyProps = {
  offers: Offer[];
  reviews: Review[];
}
const Property: FC<PropertyProps> = ({offers, reviews}) => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [propertyItem, setPropertyItem] = useState<Offer | null>(null);

  useEffect(() => {
    const desiredOffer = offers.find((offer: Offer) => offer.id === Number(id));
    if (desiredOffer) {
      setPropertyItem(desiredOffer);
    } else {
      navigate('/not-found');
    }
  }, [id, navigate, offers]);

  return (
    <main className="page__main page__main--property">
      <Helmet>
        <title>Предложение</title>
      </Helmet>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              propertyItem?.images.map((img) => (
                <div className="property__image-wrapper" key={uid()}>
                  <img className="property__image" src={img} alt={propertyItem?.title}/>
                </div>
              ))
            }
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              propertyItem?.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {propertyItem?.title}
              </h1>
            </div>
            <PropertyRating point={propertyItem?.rating}/>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {propertyItem?.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {propertyItem?.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {propertyItem?.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{propertyItem?.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  [propertyItem?.goods.map((good) => (
                    <li key={uid()} className="property__inside-item">{good}</li>
                  ))]
                }
              </ul>

            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="property__avatar user__avatar"
                    style={{height: '100%', objectFit: 'cover'}}
                    src={propertyItem?.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="property__user-name">
                  {propertyItem?.host.name}
                </span>
                <span className="property__user-status">
                  {propertyItem?.host.isPro && 'Pro'}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {propertyItem?.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <ReviewsList reviews={reviews}/>
              <ReviewsForm/>
            </section>
          </div>
        </div>
        <section className="property__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image"/>
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;80</b>
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
                  <a href="#">Wood and stone place</a>
                </h2>
                <p className="place-card__type">Private room</p>
              </div>
            </article>

            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200"
                    alt="Place image"
                  />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;132</b>
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
                  <a href="#">Canal View Prinsengracht</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>

            <article className="near-places__card place-card">
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200"
                    alt="Place image"
                  />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;180</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: '100%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Nice, cozy, warm big bed apartment</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Property;
