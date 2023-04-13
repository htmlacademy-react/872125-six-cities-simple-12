import {FC} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import { getAuthStatus, getUserName } from '../../store/slices/auth-slice/auth.selectors';
import {APIRoute, AuthorizationStatus} from '../../consts';
import cn from 'classnames';
import styles from './index.module.css';
import {logoutAction} from '../../store/slices/auth-slice/auth.slice';

type HeaderProps = {
  isLoginPage?: boolean;
}
export const Header: FC<HeaderProps> = ({isLoginPage}) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const userName = useAppSelector(getUserName);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav" style={isLoginPage ? {display: 'none'} : {display: 'block'}}>
            <ul className="header__nav-list">
              {
                authStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <div className="header__nav-profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{userName}</span>
                      </div>
                    </li>
                    <li className="header__nav-item">
                      <div className="header__nav-link">
                        <button className={cn('header__signout', styles.SignOutBtn)} type="button"
                          onClick={handleLogout}
                        >Sign out
                        </button>
                      </div>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={APIRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

