import {Link} from 'react-router-dom';
import {CityName} from '../../types/cities';
import {FC} from 'react';
import cn from 'classnames';

type CitiesListProps = {
  cities: CityName[];
  activeCity?: string;

}
export const CitiesList: FC<CitiesListProps> = ({cities, activeCity}) => (
  <ul className="locations__list tabs__list">
    {
      cities.map((city) => (
        <li className="locations__item" key={city}>
          <Link className={cn('locations__item-link tabs__item', {
            'tabs__item tabs__item--active': city.toLowerCase() === activeCity
          })} to={city.toLowerCase()}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))
    }

  </ul>
);

