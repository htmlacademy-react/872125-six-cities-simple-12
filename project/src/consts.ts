import {CityName} from './types/cities';

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Room = '/offer/:id',

  City = '/:city'
}

export enum PageStyles {
  Login = 'page page--gray page--login',
  Main = 'page page--gray page--main',
  Default = 'page page--property',
}

export enum MapInfo {
  Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  UrlTemplate = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

}

export const ONE_POINT = 20;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES: CityName[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

