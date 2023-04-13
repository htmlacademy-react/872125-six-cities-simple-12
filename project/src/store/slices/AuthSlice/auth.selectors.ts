import {State} from '../../../types/state';
import {NameSpace} from '../../../consts';

export const getAuthStatus = (state: State) => state[NameSpace.Auth].authorizationStatus;

export const getUserName = (state: State) => state[NameSpace.Auth].userName;
