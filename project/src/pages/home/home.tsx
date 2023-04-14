import {FC} from 'react';
import {Helmet} from 'react-helmet-async';
import {AppRoute, CITIES} from '../../consts';
import {CitiesList} from '../../components/cities-list/cities-list';
import {Navigate, useParams} from 'react-router-dom';
import {CitiesBlock} from '../../components/cities-block/cities-block';


export const Home: FC = () => {
  const {city} = useParams();

  if (CITIES.every((el) => el.toLowerCase() !== city)) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList cities={CITIES} activeCity={city}/>
        </section>
      </div>
      <CitiesBlock/>
    </main>
  );
};


