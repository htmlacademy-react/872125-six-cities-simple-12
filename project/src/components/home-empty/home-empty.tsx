import cn from 'classnames';
import styles from './index.module.css';
export const HomeEmpty = () => (
  <div className="cities">
    <div className='cities__places-container cities__places-container--empty container' >
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the
            moment in Dusseldorf
          </p>
        </div>
      </section>
      <div className={cn('cities__right-section', styles.rightSection)}></div>
    </div>
  </div>
);

