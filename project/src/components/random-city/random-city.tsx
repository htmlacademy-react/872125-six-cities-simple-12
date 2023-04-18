import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {CityName} from '../../types/cities';
import {getRandomCity} from '../../utils/utils';

export const RandomCity: FC = React.memo(
  () => {
    const [randomCity] = useState<CityName>(getRandomCity());
    return (
      <Link className="locations__item-link"
        to={`/${randomCity.toLowerCase()}`}
      >
        <span>{randomCity}</span>
      </Link>
    );
  },
);

RandomCity.displayName = 'RandomCity';
