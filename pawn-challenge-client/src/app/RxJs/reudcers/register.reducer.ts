import { User } from '../states/register.state';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

const initializeApp: User = {
  id: '',
  createAt: '',
  userName: '',
  password: '',
  email: '',
};
export const RegisterReducer = createReducer(
  initializeApp,
  on(AuthActions.register, (state) => state),
  on(AuthActions.registerSuccess, (state) => state),
  on(AuthActions.registerFail, (state, action) => ({
    ...state,
    error: action.error,
  })),

);
