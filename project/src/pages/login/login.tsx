import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Navigate, useNavigate} from 'react-router-dom';
import {AuthData} from '../../types/auth-data';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {loginAction} from '../../store/slices/auth-slice/auth.slice';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {getAuthStatus} from '../../store/slices/auth-slice/auth.selectors';
import {RandomCity} from '../../components/random-city/random-city';

export const Login: FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);


  const [authData, setAuthData] = useState<AuthData>({
    login: '',
    password: ''
  });

  const handleLoginInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (authInfo: AuthData) => {
    const data = await dispatch(loginAction(authInfo));
    if (data.meta.requestStatus !== 'rejected') {
      navigate(AppRoute.Main);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authData.login && authData.password) {
      (async () => {
        await onSubmit({
          login: authData.login,
          password: authData.password,
        });
      })();
    }
  };

  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main}/>;
  }

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" value={authData.login} onInput={handleLoginInputs}
                type="email" name="login" placeholder="Email" required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" value={authData.password} onInput={handleLoginInputs}
                type="password" name="password" placeholder="Password"
                pattern="^(?=^.{2,}$)(?=.*\d)(?![.\n])(?=.*[a-zA-Zа-яА-Я]).*$"
                required
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <RandomCity/>
          </div>
        </section>
      </div>
    </main>
  );
};

