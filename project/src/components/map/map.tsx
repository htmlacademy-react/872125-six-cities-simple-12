import { FC } from 'react';
import { Icon, Marker } from 'leaflet';

import { useRef, useEffect } from 'react';
import { useMap } from '../../hooks/map/use-map';
import { CityLocation, Offer } from '../../types/offers';
import { MapOptionsInfo } from '../../consts';
import cn from 'classnames';

type MapProps = {
  city: CityLocation;
  offers: Offer[];
  selectedOfferId?: number | null;
  mapClassName: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: MapOptionsInfo.UrlMarkerDefault,
  iconSize: MapOptionsInfo.IconSizes,
  iconAnchor: MapOptionsInfo.IconAnchors,
});

const currentCustomIcon = new Icon({
  iconUrl: MapOptionsInfo.UrlMarkerCurrent,
  iconSize: MapOptionsInfo.IconSizes,
  iconAnchor: MapOptionsInfo.IconAnchors,
});
export const Map: FC<MapProps> = ({city, offers, selectedOfferId, mapClassName}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        markers.push(marker);

        marker
          .setIcon(
            selectedOfferId && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }

    return () => {
      map &&
      markers.forEach((value) => {
        value.removeFrom(map);
      });
    };
  }, [map, offers, selectedOfferId]);

  return (
    <section className={cn('map', mapClassName)} ref={mapRef}>

    </section>
  );
};


