import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  private apiUrl = 'http://localhost:3000/api/inquiries';

  constructor(private http: HttpClient) {}

  createInquiry(
    propertyId: string,
    message: string
  ): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      this.apiUrl,
      {
        property: propertyId,
        message: message
      },
      { headers }
    );
  }

  getMyInquiries(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/my`,
      { headers }
    );
  }
}