import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from '../Layout/Layout';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import {AppRoute} from '../../consts';
import Property from '../../pages/Property/Property';
import NotFound from '../../pages/NotFound/NotFound';
import useScrollToTop from '../../hooks/useScrollToTop/useScrollToTop';
import { Offer } from '../../types/offers';


type AppProps = {
  amountOffers: number;
  offers: Offer[];
}
const App: FC<AppProps> = ({amountOffers, offers}) => {
  useScrollToTop();
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout/>}>
        <Route index element={<Home amountOffers={amountOffers} offers={offers}/>}/>
        <Route path={AppRoute.Room} element={<Property/>}/>
        <Route path={AppRoute.Login} element={<Login/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};


export default App;
