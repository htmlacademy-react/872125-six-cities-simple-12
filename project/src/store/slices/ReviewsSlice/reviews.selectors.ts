import { State } from '../../../types/state';
import { NameSpace } from '../../../consts';

export const getCommentsOnId = ((state: State) => state[NameSpace.Reviews].reviews);
