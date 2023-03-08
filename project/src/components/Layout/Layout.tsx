import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import { AppRoute, PageStyles } from '../../consts';
import TopIcons from '../TopIcons/TopIcons';
const Layout: FC = () => {

  const {pathname} = useLocation();
  const isLoginPage = pathname === AppRoute.Login;

  const definePageStyle = (path: string) => {
    switch (path) {
      case AppRoute.Login:
        return PageStyles.Login;
      case AppRoute.Main:
        return PageStyles.Main;
      default:
        return PageStyles.Default;
    }
  };

  return (
    <div className={definePageStyle(pathname)} >
      <TopIcons />
      <Header isLoginPage={isLoginPage} />
      <Outlet />
    </div>
  );
};
export default Layout;
