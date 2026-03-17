import { Component, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="group relative block cursor-pointer" [routerLink]="['/products', product().id]">
      <!-- Image Container -->
      <div class="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden mb-4">
        <img 
          [src]="product().image" 
          [alt]="product().name"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <!-- Hover Overlay -->
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex justify-between items-end pb-6">
          <span class="text-luxury-white text-sm tracking-widest uppercase font-medium font-sans">View Details</span>
          <button class="text-luxury-white hover:text-champagne transition-colors" (click)="addToCart($event)">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="text-center px-4">
        <h3 class="font-serif text-lg text-luxury-black mb-1 tracking-wide">{{ product().name }}</h3>
        <p class="font-sans text-sm text-gray-500 mb-2">{{ product().category }}</p>
        <p class="font-sans font-medium text-luxury-black">{{ product().price | currency:'USD' }}</p>
      </div>
    </div>
  `
})
export class ProductCard {
  product = input.required<any>();

  addToCart(event: Event) {
    event.stopPropagation();
    console.log('Added to cart', this.product().id);
  }
}
