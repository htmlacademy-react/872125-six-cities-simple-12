import { FC } from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';
const NotFound: FC = () => (
  <div className={styles.notFound}>
    <h1>
      <span>404</span> <br/> Страница не найдена &#128533;
    </h1>
    <Link to="/">
      На главную
    </Link>
  </div>
);

export default NotFound;
