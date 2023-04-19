import {FC} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {Header} from '../header/header';
import { AppRoute, CITIES, HOME_CITY_INDEX, PageStyles } from '../../consts';
import {TopIcons} from '../top-icons/top-icons';
import cn from 'classnames';

export const Layout: FC = () => {

  const {pathname} = useLocation();
  const isLoginPage = pathname === AppRoute.Login;
  const isMainPage = CITIES.some((city) => `/${city.toLowerCase()}` === pathname);

  return (
    <div className={cn(
      PageStyles.Default,
      {[PageStyles.Main]: isMainPage},
      {[PageStyles.Login]: isLoginPage})}
    >
      {pathname === AppRoute.Main && <Navigate to={CITIES[HOME_CITY_INDEX].toLowerCase()}/>}
      <TopIcons/>
      <Header isLoginPage={isLoginPage}/>
      <Outlet/>
    </div>
  );
};
