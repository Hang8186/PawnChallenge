import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import * as AuthActions from './RxJs/actions/auth.action';
import { Auth } from './RxJs/states/auth.state';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/home/login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PawnChallengeClient';
  displayName = '';
  photourl = '';
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

  idToken$ = this.store.select((state) => state.auth.idToken);
  logIn() {
    this.store.dispatch(AuthActions.login());
  }
  logOut() {
    this.store.dispatch(AuthActions.logout());
    console.log('logout');
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'dialogLogin', 
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
