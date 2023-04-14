import { FC } from 'react';
import { Icon, Marker } from 'leaflet';

import { useRef, useEffect } from 'react';
import { useMap } from '../../hooks/map/use-map';
import { CityLocation, Offer } from '../../types/offers';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../consts';
import cn from 'classnames';

type MapProps = {
  city: CityLocation;
  offers: Offer[];
  selectedOfferId?: number | null;
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


