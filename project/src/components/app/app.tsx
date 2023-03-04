import Home from '../../pages/Home/Home';
import {FC} from 'react';

type AppProps = {
  amountOffers: number;
}
const App: FC<AppProps> = ({amountOffers}) => (<Home amountOffers={amountOffers}/>);

export default App;
