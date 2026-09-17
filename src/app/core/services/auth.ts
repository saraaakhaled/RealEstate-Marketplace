import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'https://estatehub-backend-five.vercel.app/api/auth';

  constructor(private http: HttpClient) {}


  signup(user: {
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
  }): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/signup`,
      user
    );

  }


  login(
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );

  }


  getProfile(): Observable<any> {

    const token =
      localStorage.getItem('token');

    return this.http.get(
      `${this.apiUrl}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  }


  getAgents(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/agents`
    );

  }


  saveToken(token: string): void {

    localStorage.setItem(
      'token',
      token
    );

  }


  getToken(): string | null {

    return localStorage.getItem('token');

  }


  logout(): void {

    localStorage.removeItem('token');

  }


  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

}
