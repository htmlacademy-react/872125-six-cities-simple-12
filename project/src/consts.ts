import {CityName} from './types/cities';
import {SortItem} from './types/offers-sort';
import { MapOptions } from './types/map-options';


export const ONE_POINT = 20;
export const YEAR_AND_MONTH_FORMAT = 'MMMM YYYY';

export const HOME_CITY_INDEX = 0;

export const FIRST_INDEX_ARRAY_ELEMENT = 0;

export const DEFAULT_RATING = 0;
export const DEFAULT_OFFER_SORT_INDEX = 0;

export enum ReviewCount {
  ReviewStartCount = 0,
  ReviewEndCount = 10,
}
export enum PropertyImgCount {
  PropertyImgStartCount = 0,
  PropertyImgEndCount = 6,
}
export enum CodeStatuses {
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}
export enum AppRoute {
  Login = '/login',
  Main = '/',
  Room = '/offer/:id',
  City = '/:city',
  NotFound = '/not-found/not-found'
}

export enum PageStyles {
  Login = 'page page--gray page--login',
  Main = 'page page--gray page--main',
  Default = 'page page--property',
}

export const MapOptionsInfo: MapOptions = {
  Attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  UrlTemplate : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  UrlMarkerCurrent: '../img/pin-active.svg',
  UrlMarkerDefault: '../img/pin.svg',
  IconSizes: [27, 39],
  IconAnchors: [27, 39]
};

export const CITIES: CityName[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const offerSortProperties: SortItem[] = [
  {
    sortName: 'Popular',
    sortProperty: 'popular'
  },
  {
    sortName: 'Price: low to high',
    sortProperty: 'lowToHigh'
  },
  {
    sortName: 'Price: high to low',
    sortProperty: 'highToLow'
  },
  {
    sortName: 'Top rated first',
    sortProperty: 'rating'
  },
];

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
  Comments = '/comments',
}

export enum APIStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum NameSpace {
  Offers = 'OFFERS',
  Reviews = 'REVIEWS',
  Auth = 'AUTH',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ReviewLengthValidation {
  Min = 50,
  Max = 300,
}
