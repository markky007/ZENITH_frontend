import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'z-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen()" class="fixed inset-0 z-50 flex items-stretch justify-end">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        (click)="close()">
      </div>
      
      <!-- Drawer Panel -->
      <div 
        class="relative w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl flex flex-col h-full animate-slide-in-right transform transition-transform">
        
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-platinum/50">
          <h2 class="text-xl font-serif text-luxury-black tracking-wide">{{ title() }}</h2>
          <button 
            (click)="close()" 
            class="text-gray-400 hover:text-luxury-black transition-colors focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 font-sans">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .animate-slide-in-right {
      animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class ZDrawer {
  isOpen = input(false);
  title = input<string>('');
  
  closed = output<void>();

  close() {
    this.closed.emit();
  }
}
