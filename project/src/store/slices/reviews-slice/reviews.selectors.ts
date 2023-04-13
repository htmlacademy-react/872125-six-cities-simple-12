import { State } from '../../../types/state';
import { NameSpace} from '../../../consts';

export const getCommentsOnId = ((state: State) => {
  const sortArr = [...state[NameSpace.Reviews].reviews];
  return sortArr.reverse();
} );
