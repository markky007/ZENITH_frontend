import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'z-btn',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="computedClasses()"
      [disabled]="disabled()"
      (click)="onClick($event)">
      <ng-content></ng-content>
    </button>
  `
})
export class ZBtn {
  variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  block = input(false);
  
  clicked = output<MouseEvent>();

  computedClasses() {
    let base = 'inline-flex items-center justify-center font-sans transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    // Size
    if (this.size() === 'sm') base += ' px-3 py-1.5 text-sm';
    else if (this.size() === 'lg') base += ' px-8 py-4 text-lg tracking-wide';
    else base += ' px-6 py-3 text-base tracking-wide';

    // Width
    if (this.block()) base += ' w-full';

    // Variant
    const v = this.variant();
    if (v === 'primary') {
      base += ' bg-luxury-black text-luxury-white hover:bg-zinc-800 hover:shadow-lg focus:ring-luxury-black font-medium leading-none';
    } else if (v === 'secondary') {
      base += ' bg-champagne text-luxury-black hover:bg-champagne-dark hover:shadow-md focus:ring-champagne-dark font-medium leading-none';
    } else if (v === 'outline') {
      base += ' border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-luxury-white focus:ring-luxury-black font-medium leading-none';
    } else if (v === 'ghost') {
      base += ' text-luxury-black hover:bg-zinc-100 focus:ring-zinc-200 font-medium leading-none';
    }
    
    return base;
  }

  onClick(event: MouseEvent) {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
