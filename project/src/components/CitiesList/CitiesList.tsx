import { Link } from 'react-router-dom';
import { CityName } from '../../types/cities';
import { FC } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks/store';


type CitiesListProps = {
  cities: CityName[];
  activeCity: CityName;
}
export const CitiesList: FC<CitiesListProps> = ({cities, activeCity}) => {

  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => (
          <li className="locations__item" key={city}>
            <Link className={cn('locations__item-link tabs__item', {
              'tabs__item tabs__item--active': city === activeCity
            })} to={city.toLowerCase()}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))
      }

      {/*<li className="locations__item">*/}
      {/*  <Link className="locations__item-link tabs__item tabs__item--active" to="/">*/}
      {/*    <span>Amsterdam</span>*/}
      {/*  </Link>*/}
      {/*</li>*/}

    </ul>
  );
};

