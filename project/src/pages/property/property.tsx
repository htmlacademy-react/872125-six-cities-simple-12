import {FC, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate, useParams} from 'react-router-dom';

import {PropertyRating} from '../../components/property-rating/property-rating';
import {ReviewsForm} from '../../components/reviews-form/reviews-form';
import {ReviewsList} from '../../components/reviews-list/reviews-list';
import {Map} from '../../components/map/map';
import {OffersList} from '../../components/offers-list/offers-list';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {
  APIStatus,
  AppRoute,
  AuthorizationStatus,
  PropertyImgCount
} from '../../consts';
import {
  getApiStatusProperty,
  getNearbyOffers,
  getOfferOnId
} from '../../store/slices/offers-slice/offers.selectors';
import { fetchNearbyOffersOnId, fetchOfferOnId } from '../../store/slices/offers-slice/offers.slice';
import {Loader} from '../../components/loader/loader';
import { fetchReviewsOnId } from '../../store/slices/reviews-slice/reviews.slice';
import { getCommentsOnId } from '../../store/slices/reviews-slice/reviews.selectors';
import { getAuthStatus } from '../../store/slices/auth-slice/auth.selectors';

export const Property: FC = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const propertyItem = useAppSelector(getOfferOnId);
  const propertyApiStatus = useAppSelector(getApiStatusProperty);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getCommentsOnId);

  useEffect(() => {
    (async () => {
      const desiredOffer = await dispatch(fetchOfferOnId(Number(id)));
      dispatch(fetchNearbyOffersOnId(Number(id)));
      dispatch(fetchReviewsOnId(Number(id)));
      if (!desiredOffer.payload) {
        navigate(AppRoute.NotFound);
      }
    })();
  }, [dispatch, id, navigate]);

  if (propertyApiStatus === APIStatus.Loading) {
    return <Loader/>;
  }

  return (
    <main className="page__main page__main--property">
      <Helmet>
        <title>Предложение</title>
      </Helmet>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              propertyItem?.images.slice(PropertyImgCount.PropertyImgStartCount, PropertyImgCount.PropertyImgEndCount)
                .map((img) => (
                  <div className="property__image-wrapper" key={img}>
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
                    <li key={good} className="property__inside-item">{good}</li>
                  ))]
                }
              </ul>

            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div
                  className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper"
                >
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
              <h2 className="reviews__title">Reviews &middot;
                <span
                  className="reviews__amount"
                >
                  {reviews.length}
                </span>
              </h2>
              <ReviewsList reviews={reviews}/>
              {authStatus === AuthorizationStatus.Auth && <ReviewsForm propertyId={Number(id)}/>}
            </section>
          </div>
        </div>
        {
          propertyItem && (
            <div className="container">
              <Map city={propertyItem.city.location} offers={[...nearbyOffers, propertyItem]} selectedOfferId={Number(id)} mapClassName="property__map"/>
            </div>
          )
        }
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          {
            nearbyOffers.length ? (
              <OffersList offers={nearbyOffers} offersClassNames="near-places__list"/>
            ) : <h3>No places found nearby</h3>
          }
        </section>
      </div>
    </main>
  );
};

