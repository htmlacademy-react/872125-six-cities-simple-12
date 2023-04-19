import {FC, useState} from 'react';
import cn from 'classnames';
import {offerSortProperties} from '../../consts';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {setSortItem} from '../../store/slices/offers-slice/offers.slice';
import {getActiveSort} from '../../store/slices/offers-slice/offers.selectors';

export const OffersSort: FC = () => {
  const [visibleSort, setIsVisibleSort] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const activeSort = useAppSelector(getActiveSort);

  const handleActiveSort = (index: number) => {
    dispatch(setSortItem(offerSortProperties[index]));
    setIsVisibleSort(false);
  };

  return (
    <div className="places__sorting">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsVisibleSort(!visibleSort)}>
        {activeSort.sortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={cn(
        'places__options places__options--custom',
        {'places__options--opened': visibleSort})}
      >
        {
          offerSortProperties.map((sortItem, index) => (
            <li className={cn(
              'places__option',
              {'places__option--active': sortItem === activeSort}
            )}
            tabIndex={0}
            key={sortItem.sortProperty}
            onClick={() => handleActiveSort(index)}
            >
              {sortItem.sortName}
            </li>
          ))
        }
      </ul>
    </div>
  );
};


