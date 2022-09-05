import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const login = createAction(
  "[Auth] Login",
);

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ idToken: string }>()
);

export const loginFail = createAction(
  "[Auth] Login Fail",
  props<{ error: string }>()
)

export const logout = createAction(
  "[Auth] Logout"
);

export const logoutSuccess = createAction(
  "[Auth] Logout Success"
);

export const logoutFail = createAction(
  "[Auth] Logout Fail",
  props<{ error: string }>()
);

export const register = createAction(
  "[Auth] Register",
  props<{ user: User }>()
);

export const registerSuccess = createAction(
  "[Auth] Register Success",

);

export const registerFail = createAction(
  "[Auth] Register Fail",
  props<{ error: string }>()
);
