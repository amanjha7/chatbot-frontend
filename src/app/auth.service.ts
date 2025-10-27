import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:5000'; // Flask backend URL

  constructor(private http: HttpClient) { }

  /** User login */
  login( email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { password, email });
  }

  /** User registration */
  register(username: string , email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, { username, email, password });
  }

  forgotPassword(email:string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/auth/forgot_password`,{email})
  }
}
