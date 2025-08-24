import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode <JwtPayload>(token);
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp > now) {
          return true; // token still valid
        }
      } catch (e) {
        console.error('Invalid token', e);
      }
    }

    // no token or expired → redirect
    return this.router.parseUrl('/login');
  }
}
