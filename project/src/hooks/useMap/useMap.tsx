import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {CityLocation} from '../../types/offers';
import {MapInfo} from '../../consts';

export const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityLocation
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude
        },
        zoom: city.zoom
      });

      const layer = new TileLayer(
        MapInfo.UrlTemplate,
        {
          attribution: MapInfo.Attribution
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
};

