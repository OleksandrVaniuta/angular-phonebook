import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { tap } from 'rxjs';
import { catchError } from 'rxjs';

import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl = 'https://connections-api.herokuapp.com/contacts';

  constructor(private http: HttpClient) { }
  
getContacts(): Observable<any> {

  const token = localStorage.getItem('authToken')
  
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any>( this.baseUrl, {headers}).pipe(tap(response => {
      
      return response
    }), catchError(this.handleError<any>('getContacts', [])))
  }

    addContact(credentials: { name: string, number: string }): Observable<any> {
  const token = localStorage.getItem('authToken')
  
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<any>(this.baseUrl, credentials, {headers}).pipe(tap(response => {
      return response
    }))
  }

   editContact(id: string, credentials: { name: string, number: string }): Observable<any> {
  const token = localStorage.getItem('authToken')
  
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<any>(`${this.baseUrl}/${id}`, credentials, {headers}).pipe(tap(response => {
      return response
    }))
  }

  deleteContact(id: string): Observable<any> {
  const token = localStorage.getItem('authToken')
  
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete<any>(`${this.baseUrl}/${id}`, {headers})
  }


  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); 

  console.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

}
