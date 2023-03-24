import {FC} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {Header} from '../Header/Header';
import {AppRoute, CITIES, PageStyles} from '../../consts';
import {TopIcons} from '../TopIcons/TopIcons';
import cn from 'classnames';

export const Layout: FC = () => {

  const {pathname} = useLocation();
  const isLoginPage = pathname === AppRoute.Login;
  const isMainPage = pathname === AppRoute.Main;

  return (
    <div className={cn(
      PageStyles.Default,
      {[PageStyles.Main]: isMainPage},
      {[PageStyles.Login]: isLoginPage})}
    >
      {pathname === AppRoute.Main && <Navigate to={CITIES[0].toLowerCase()}/>}
      <TopIcons/>
      <Header isLoginPage={isLoginPage}/>
      <Outlet/>
    </div>
  );
};
