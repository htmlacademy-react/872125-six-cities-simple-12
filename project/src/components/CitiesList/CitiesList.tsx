import { Link } from 'react-router-dom';
import { CityName } from '../../types/cities';
import { FC, SyntheticEvent } from 'react';
import cn from 'classnames';

type CitiesListProps = {
  cities: CityName[];
  activeCity: CityName;
  onChangeCity: (city: CityName) => void;
}
export const CitiesList: FC<CitiesListProps> = ({cities, activeCity, onChangeCity}) => {


  const onSwitchActiveTab = (city: CityName, e:SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    onChangeCity(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => (
          <li className="locations__item" key={city}>
            <Link className={cn('locations__item-link tabs__item', {
              'tabs__item tabs__item--active': city === activeCity
            })} to={city.toLowerCase()} onClick={(e) => onSwitchActiveTab(city, e)}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))
      }

    </ul>
  );
};

