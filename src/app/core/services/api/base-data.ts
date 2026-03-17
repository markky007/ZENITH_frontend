import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  protected http = inject(HttpClient);
  // Defaulting to :8080 backend but customizable by extended services.
  private baseUrl = 'http://localhost:8080/api';

  protected get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params });
  }

  protected post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, data);
  }

  protected put<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, data);
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}
