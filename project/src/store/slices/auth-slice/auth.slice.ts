import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {APIRoute, AuthorizationStatus, NameSpace} from '../../../consts';
import {createAPI} from '../../../services/api';
import {AuthData} from '../../../types/auth-data';
import {UserData} from '../../../types/user-data';
import {dropToken, saveToken} from '../../../services/token';


type AuthSliceState = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
}


export const checkAuthAction = createAsyncThunk<UserData, undefined>(
  'auth/checkAuth',
  async () => {
    const api = createAPI();
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData>(
  'auth/login',
  async ({login: email, password}) => {
    const api = createAPI();
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);
export const logoutAction = createAsyncThunk<void, undefined>(
  'auth/logout',
  async () => {
    const api = createAPI();
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);


const initialState: AuthSliceState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: ''
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload.name;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload.name;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userName = '';
      });

  }

});

export default authSlice.reducer;
