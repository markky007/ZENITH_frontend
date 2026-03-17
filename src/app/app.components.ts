import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `<h1>{{ message }}</h1>`,
  standalone: true,
})
export class AppComponent {
  message = 'Loading...';
  http = inject(HttpClient);

  ngOnInit() {
    this.http
      .get<{ text: string }>('http://localhost:8080/api/hello')
      .subscribe((data) => (this.message = data.text));
  }
}
