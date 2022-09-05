import { Auth } from '../states/auth.state';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

const initializeApp: Auth = {
  isAuthenticated: false,
  idToken: '',
  //name: '',
  error: '',
};
export const AuthReducer = createReducer(
  initializeApp,
  on(AuthActions.login, (state) => state),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    isAuthenticated: true,
    idToken: action.idToken,

  })),
  on(AuthActions.loginFail, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.logout, (state) => state),
  on(AuthActions.logoutSuccess, (state, action) => ({
    ...state,
    isAuthenticated: false,
    idToken: '',
  })),
  on(AuthActions.logoutFail, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.register, (state) => state),
  on(AuthActions.registerSuccess, (state) => state),
  on(AuthActions.registerFail, (state, action) => ({
    ...state,
    error: action.error,
  })),

);
