import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  private dataService = inject(DataService);
  employees: any[] = [];

  ngOnInit() {
    this.dataService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        console.log('รับข้อมูลจาก Go สำเร็จ!', res);
      },
      error: (err) => console.error('เกิดข้อผิดพลาด:', err),
    });
  }
}
