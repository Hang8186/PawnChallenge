import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

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
