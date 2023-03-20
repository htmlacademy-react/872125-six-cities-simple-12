import {FC, useState} from 'react';
import {uid} from 'uid';
import cn from 'classnames';


const OffersSortMap = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];
export const OffersSort: FC = () => {
  const [visibleSort, setIsVisibleSort] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<string>('Popular');

  const handleActiveSort = (index: number) => {
    setActiveSort(OffersSortMap[index]);
    setIsVisibleSort(false);
  };

  return (
    <div className="places__sorting">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsVisibleSort(!visibleSort)}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={cn(
        'places__options places__options--custom',
        {'places__options--opened': visibleSort})}
      >
        {
          OffersSortMap.map((sortItem, index) => (
            <li className={cn(
              'places__option',
              {'places__option--active': sortItem === activeSort}
            )}
            tabIndex={0}
            key={uid()}
            onClick={() => handleActiveSort(index)}
            >
              {sortItem}
            </li>
          ))
        }
      </ul>
    </div>
  );
};


