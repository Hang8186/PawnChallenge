import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private Http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {}
  public isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      this.auth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  login() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          let credential = await signInWithPopup(
            this.auth,
            new GoogleAuthProvider()
          );
          let idToken = await credential.user.getIdToken();

          resolve(idToken);
        } catch (error) {
          reject('login error');
        }
      })
    );
  }
  logOut() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          await signOut(this.auth);
          resolve('logout success');
          this.router.navigate(['/chessBoard']);
        } catch (error) {
          reject('logout error');
        }
      })
    );
  }
  register(user: User): Observable<User[]> {
    return this.Http.post<User[]>(`${environment.endPoint}/user/register`, user);
  }
  loginWithUserNameAndPassword(user: User): Observable<User[]> {
    return this.Http.post<User[]>(`${environment.endPoint}/user/login`, user);
  }
}
