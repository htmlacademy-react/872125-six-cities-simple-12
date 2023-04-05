import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APIRoute, AuthorizationStatus, NameSpace} from '../../../consts';
import {createAPI} from '../../../services/api';
import {AuthData} from '../../../types/auth-data';
import {UserData} from '../../../types/user-data';
import {dropToken, saveToken} from '../../../services/token';


type AuthSliceState = {
  authorizationStatus: AuthorizationStatus;
}


export const checkAuthAction = createAsyncThunk<void, undefined>(
  'auth/checkAuth',
  async () => {
    const api = createAPI();
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<void, AuthData>(
  'auth/login',
  async ({login: email, password}) => {
    const api = createAPI();
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
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
  authorizationStatus: AuthorizationStatus.Unknown
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });

  }

});
export const {requireAuthorization} = authSlice.actions;
export default authSlice.reducer;
