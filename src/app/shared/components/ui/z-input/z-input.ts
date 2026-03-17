import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'z-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative w-full">
      <input 
        [type]="type()"
        [id]="id()"
        [placeholder]="placeholder()"
        [(ngModel)]="value"
        (focus)="isFocused = true"
        (blur)="isFocused = false"
        class="block px-2.5 pb-2.5 pt-6 w-full text-sm text-luxury-black bg-transparent border-b border-platinum appearance-none focus:outline-none focus:ring-0 focus:border-luxury-black peer transition-colors"
      />
      <label 
        [for]="id()" 
        class="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] peer-focus:left-0 peer-focus:text-luxury-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-sans"
        [class.left-0]="true">
        {{ label() }}
      </label>
      <div *ngIf="error()" class="text-red-500 text-xs mt-1 font-sans">{{ error() }}</div>
    </div>
  `
})
export class ZInput {
  id = input<string>(`z-input-${Math.random().toString(36).substr(2, 9)}`);
  type = input<string>('text');
  label = input<string>('');
  placeholder = input<string>(' '); // Space is needed for the peer-placeholder-shown trick
  error = input<string>('');
  
  value = model<string>('');
  
  isFocused = false;
}
