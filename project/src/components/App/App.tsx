import {FC, useEffect, useRef} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Layout} from '../Layout/Layout';
import {Home} from '../../pages/Home/Home';
import {Login} from '../../pages/Login/Login';
import {AppRoute} from '../../consts';
import {Property} from '../../pages/Property/Property';
import {NotFound} from '../../pages/NotFound/NotFound';
import {useScrollToTop} from '../../hooks/scroll/useScrollToTop';
import {useAppDispatch} from '../../hooks/store';
import {fetchOffers} from '../../store/slices/OffersSlice/offers.slice';
import {checkAuthAction} from '../../store/slices/AuthSlice/auth.slice';


export const App: FC = () => {
  const dispatch = useAppDispatch();

  const isRenderedRef = useRef<boolean>(false);

  useScrollToTop();

  useEffect(() => {
    if (!isRenderedRef.current) {
      (async () => {
        await dispatch(checkAuthAction());
        await dispatch(fetchOffers());
      })();
    }
    isRenderedRef.current = true;

  }, [dispatch]);


  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout/>}>
        <Route element={<Home/>}>
          <Route path={AppRoute.City} element={<Home/>}/>
        </Route>
        <Route path={AppRoute.Room}
          element={<Property />}
        />
        <Route path={AppRoute.Login} element={<Login/>} index/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};


