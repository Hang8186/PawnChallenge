import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from '../actions/auth.action';
import { catchError, from, map, switchMap } from 'rxjs';
import { of } from 'rxjs';
@Injectable()
export class registerEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => from(this.authService.register(action.user))),
      map(() => AuthActions.registerSuccess()),
      catchError((error) => of(AuthActions.registerFail({ error: error })))
    )
  );
}
