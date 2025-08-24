import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      // Already logged in → redirect to chat
      return this.router.parseUrl('/chat');
    }

    // No token → allow login page
    return true;
  }
}
