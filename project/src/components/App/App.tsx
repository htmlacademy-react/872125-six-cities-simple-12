import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Layout} from '../Layout/Layout';
import {Home} from '../../pages/Home/Home';
import {Login} from '../../pages/Login/Login';
import {AppRoute} from '../../consts';
import {Property} from '../../pages/Property/Property';
import {NotFound} from '../../pages/NotFound/NotFound';
import {useScrollToTop} from '../../hooks/scroll/useScrollToTop';
import {Offer} from '../../types/offers';
import {Review} from '../../types/reviews';


type AppProps = {
  offers: Offer[];
  reviews: Review[];
  neighboursOffers: Offer[];
}
export const App: FC<AppProps> = ({offers, reviews, neighboursOffers}) => {
  useScrollToTop();
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout/>}>
        <Route element={<Home/>}>
          <Route path={AppRoute.City}/>
        </Route>
        <Route path={AppRoute.Room}
          element={<Property offers={offers} reviews={reviews} neighboursOffers={neighboursOffers}/>}
        />
        <Route path={AppRoute.Login} element={<Login/>} index/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};


