import styles from './index.module.css';
import cn from 'classnames';

export const Loader = () => (
  <div className={cn(styles.Loader, 'container')}>
    <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
      y="0px"
      viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve"
    >
      <circle fill="#4481c3" stroke="none" cx="6" cy="50" r="3">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 15 ; 0 -15; 0 15"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="#4481c3" stroke="none" cx="20" cy="50" r="3">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 10 ; 0 -10; 0 10"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="#4481c3" stroke="none" cx="34" cy="50" r="3">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 5 ; 0 -5; 0 5"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  </div>

);

