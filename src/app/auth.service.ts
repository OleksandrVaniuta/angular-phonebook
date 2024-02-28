import { Injectable } from '@angular/core';
import {  Observable, of, throwError} from 'rxjs';
import { tap } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http'; 
import { HttpHeaders } from '@angular/common/http';

import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  baseUrl = 'https://connections-api.herokuapp.com/users';
   private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {

    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(tap(response => {
      console.log('Login successful', response);
      
    
      if (response.token) {
        this.isAuthenticated = true;
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('user', response.user.email);
      }
      return response
    }), catchError(this.handleError))
  }

  signup(credentials: { name: string, email: string, password: string }): Observable<any> {

    return this.http.post<any>(`${this.baseUrl}/signup`, credentials).pipe(tap(response => {
      console.log('Login successful', response);
      
    
      if (response.token) {
        this.isAuthenticated = true;
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('user', response.user.email);
      }
      return response
    }), catchError(this.handleError))
  }

 isAuthenticatedUser(): Observable<boolean> {
    return of(!!localStorage.getItem(this.tokenKey));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  refresh(): Observable<any> {

    const token = localStorage.getItem('authToken')
  
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/current`, {headers}).pipe(tap(response => {    
     localStorage.setItem('user', response.email);
      return response
    }), catchError(this.handleError))
  }


  
  private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
  
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  
  return throwError(() => new Error('bad request'));
  }
  
  
}

