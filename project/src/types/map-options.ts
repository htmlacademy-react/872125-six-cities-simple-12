import { PointExpression } from 'leaflet';

export type MapOptions = {
  Attribution : string;
  UrlTemplate : string;
  UrlMarkerCurrent: string;
  UrlMarkerDefault: string;
  IconSizes: PointExpression;
  IconAnchors: PointExpression;
}
