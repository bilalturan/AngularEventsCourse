import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string) {

    const loginInfo = {username: userName, password: password };

    return this.http.post('/api/login', loginInfo)
      .pipe(tap(data => {
        this.currentUser = <User>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false); // Returns Observable of 'false'
      }));
  }

  isAuthenticated(): boolean {
      return !!this.currentUser;
  }

  checkAuthenticationStatus(): void {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <User>data;
        }
      }))
      .subscribe();
  }


  updateCurrentUser(firstName: string, lastName: string): Observable<User> {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    return this.http.put<User>('/api/users/' + this.currentUser.id, this.currentUser);
  }
}
