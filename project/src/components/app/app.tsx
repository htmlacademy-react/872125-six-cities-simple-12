import {FC, useEffect, useRef} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Layout} from '../layout/layout';
import {Home} from '../../pages/home/home';
import {Login} from '../../pages/login/login';
import {AppRoute} from '../../consts';
import {Property} from '../../pages/property/property';
import {NotFound} from '../../pages/not-found/not-found';
import {useScrollToTop} from '../../hooks/scroll/use-scroll-to-top';
import {useAppDispatch} from '../../hooks/store';
import {fetchOffers} from '../../store/slices/offers-slice/offers.slice';
import {checkAuthAction} from '../../store/slices/auth-slice/auth.slice';


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


