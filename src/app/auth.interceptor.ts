import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let cloned = req;
    if (token) {
      cloned = req.clone({
        setHeaders: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Clear session and redirect
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
