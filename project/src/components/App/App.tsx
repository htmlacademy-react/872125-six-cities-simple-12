import {FC} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../Layout/Layout';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import { AppRoute } from '../../consts';
import Property from '../../pages/Property/Property';
import NotFound from '../../pages/NotFound/NotFound';


type AppProps = {
  amountOffers: number;
}
const App: FC<AppProps> = ({amountOffers}) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route index element={<Home amountOffers={amountOffers}/>}/>
        <Route path={AppRoute.Room} element={<Property/>}/>
      </Route>
      <Route path={AppRoute.Login} element={<Login/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>

);

export default App;
