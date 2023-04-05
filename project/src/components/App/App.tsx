import { FC, useEffect, useRef } from 'react';
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
import { useAppDispatch } from '../../hooks/store';
import { fetchOffers } from '../../store/slices/offers.slice';


type AppProps = {
  reviews: Review[];
  neighboursOffers: Offer[];
}
export const App: FC<AppProps> = ({reviews, neighboursOffers}) => {
  const dispatch = useAppDispatch();

  const isRenderedRef = useRef<boolean>(false);

  useScrollToTop();

  useEffect(() => {
    if (!isRenderedRef.current) {
      (async () => {
        await dispatch(fetchOffers());
      })();
    }
    isRenderedRef.current = true;

  },[dispatch]);


  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout/>}>
        <Route element={<Home/>}>
          <Route path={AppRoute.City} element={<Home/>}/>
        </Route>
        <Route path={AppRoute.Room}
          element={<Property reviews={reviews} neighboursOffers={neighboursOffers}/>}
        />
        <Route path={AppRoute.Login} element={<Login/>} index/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};


