import { FC } from 'react';
import { Icon, Marker } from 'leaflet';

import { useRef, useEffect } from 'react';
import { useMap } from '../../hooks/map/useMap';
import { CityLocation, Offer } from '../../types/offers';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../consts';
import cn from 'classnames';

type MapProps = {
  city: CityLocation;
  offers: Offer[];
  selectedOffer?: Offer | null;
  mapClassName: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});
export const Map: FC<MapProps> = ({city, offers, selectedOffer, mapClassName}) => {
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
            selectedOffer && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });

      return () => {
        map && (
          markers.forEach((marker) => {
            marker.removeFrom(map);
          })
        );
      };
    }

  }, [map, offers, selectedOffer]);

  return (
    <section className={cn('map', mapClassName)} ref={mapRef}>

    </section>
  );
};


