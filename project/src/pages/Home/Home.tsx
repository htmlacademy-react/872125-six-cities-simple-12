import {FC} from 'react';
import {Helmet} from 'react-helmet-async';
import {CITIES} from '../../consts';
import {CitiesList} from '../../components/CitiesList/CitiesList';
import {useParams} from 'react-router-dom';
import {CitiesBlock} from '../../components/CitiesBlock/CitiesBlock';


export const Home: FC = () => {
  const {city} = useParams();

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


