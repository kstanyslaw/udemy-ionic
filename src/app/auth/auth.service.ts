import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuth = true;

  get userIsAuth() {
    return this._userIsAuth;
  }

  constructor() { }

  login() {
    this._userIsAuth = true;
  }

  logout() {
    this._userIsAuth = false;
  }
}
