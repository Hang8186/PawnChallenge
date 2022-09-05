import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from '../../../RxJs/actions/auth.action';
import { Auth } from '../../../RxJs/states/auth.state';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formRegister!: FormGroup;
  title = 'PawnChallengeClient';
  displayName = '';
  photourl = '';
  email: string = '';
  password: string = '';
  constructor(
    private store: Store<{ auth: Auth }>,
    private AuthService: AuthService,
    public dialog: MatDialog
  ) {
    this.AuthService.getCurrentUser().then(
      (user) =>
        (this.photourl = user.photourl != null ? user.photourl : user.photo)
    );
    this.AuthService.getCurrentUser().then(
      (user) =>
        (this.displayName =
          user.displayName != null ? user.displayName : user.email)
    );
    this.AuthService.isUserLoggedIn.subscribe((value) => {
      if (value) {
        this.AuthService.getCurrentUser().then(
          (user) =>
            (this.displayName =
              user.displayName != null ? user.displayName : user.email)
        );
      } else {
        this.displayName = 'null';
      }
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  idToken$ = this.store.select((state) => state.auth.idToken);
  logIn() {
    this.store.dispatch(AuthActions.login());
  }
  logOut() {
    this.store.dispatch(AuthActions.logout());
    console.log('logout');
  }
  registerAccount() {
    let newForm = {
      ...this.formRegister.value,
    };
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    this.store.dispatch(AuthActions.register({ user: newForm }));
}
// openDialogLogin() {
//   const dialogRef = this.dialog.open(LoginComponent, {
//     panelClass: 'dialogLogin', 
//     width: '70em',
//     height: '68em',
//   });
//   dialogRef.afterClosed().subscribe(result => {
//     console.log(`Dialog result: ${result}`);
//   });
// }
}

