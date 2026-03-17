import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // ตัวอย่างฟังก์ชันดึงข้อมูลพนักงานจาก Go Backend
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/employees`);
  }

  // ตัวอย่างฟังก์ชันส่งข้อมูลไปบันทึก
  createEmployee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/employees`, data);
  }
}
