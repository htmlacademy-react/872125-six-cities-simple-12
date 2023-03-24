import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {Header} from '../Header/Header';
import {AppRoute, PageStyles} from '../../consts';
import {TopIcons} from '../TopIcons/TopIcons';
import cn from 'classnames';

export const Layout: FC = () => {

  const {pathname} = useLocation();

  const isLoginPage = pathname === AppRoute.Login;
  const isMainPage = pathname === AppRoute.Main;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(AppRoute.City);
  }, []);

  return (
    <div className={cn(
      PageStyles.Default,
      {[PageStyles.Main]: isMainPage},
      {[PageStyles.Login]: isLoginPage})}
    >
      <TopIcons/>
      <Header isLoginPage={isLoginPage}/>
      <Outlet/>
    </div>
  );
};
