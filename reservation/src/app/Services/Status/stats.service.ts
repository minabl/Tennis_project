import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  authState: {
    isLoggedIn: boolean;
    UserEmail: string | undefined;
    authorities: string[];
    token: string | undefined;
  } = {
    isLoggedIn: false,
    UserEmail: undefined,
    authorities: [],
    token: undefined
  };

  constructor() {
    const token = Cookies.get('accessToken');

    if (token) {
      try {
        const jwt: any = jwtDecode(token);
        this.authState = {
          isLoggedIn: true,
          UserEmail: jwt.sub,
          authorities: jwt.scope,
          token: token
        };
      } catch (error) {
        console.error('Invalid token:', error);
        this.authState.isLoggedIn = false;
      }
    }
  }
}
