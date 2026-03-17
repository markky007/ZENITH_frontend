import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ZBtn } from '../../../shared/components/ui/z-btn/z-btn';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ZBtn],
  template: `
    <div class="min-h-screen bg-luxury-white pt-20">
      <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        
        <!-- Left: Image Gallery -->
        <div class="w-full lg:w-3/5 relative flex items-center justify-center p-8 bg-zinc-50 border-r border-platinum/30">
          <img 
            [src]="product().image" 
            [alt]="product().name"
            class="max-w-full max-h-[70vh] object-contain shadow-2xl animate-fade-in"
          />
        </div>
        
        <!-- Right: Info -->
        <div class="w-full lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center animate-slide-in-right">
          <div class="max-w-md">
            <p class="font-sans text-sm tracking-widest text-gray-500 uppercase mb-4">{{ product().category }}</p>
            <h1 class="font-serif text-4xl lg:text-5xl text-luxury-black mb-4">{{ product().name }}</h1>
            <p class="font-sans text-2xl text-luxury-black font-light mb-8">{{ product().price | currency:'USD' }}</p>
            
            <p class="font-sans text-gray-600 leading-relaxed mb-10 text-sm tracking-wide">
              {{ product().description }}
            </p>
            
            <!-- Variants -->
            <div class="mb-10">
              <span class="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">Select Material</span>
              <div class="flex gap-4">
                @for (variant of product().variants; track variant.name) {
                  <button 
                    (click)="selectedVariant.set(variant)"
                    [class.border-luxury-black]="selectedVariant()?.name === variant.name"
                    [class.border-transparent]="selectedVariant()?.name !== variant.name"
                    class="border flex items-center gap-2 p-2 hover:border-gray-400 transition-colors">
                    <span class="w-6 h-6 rounded-full border border-gray-200" [ngStyle]="{'background-color': variant.color}"></span>
                    <span class="font-sans text-sm tracking-wide px-2">{{ variant.name }}</span>
                  </button>
                }
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex flex-col gap-4">
              <z-btn variant="primary" size="lg" [block]="true" (clicked)="addToCart()">
                ADD TO CART
              </z-btn>
              <z-btn variant="outline" size="lg" [block]="true">
                BOOK APPOINTMENT
              </z-btn>
            </div>
            
            <div class="mt-12 border-t border-platinum pt-6">
              <details class="group cursor-pointer">
                <summary class="flex justify-between items-center font-sans tracking-widest text-sm uppercase list-none">
                  <span>Product Details</span>
                  <span class="transition group-open:rotate-180">▼</span>
                </summary>
                <div class="text-gray-500 font-sans text-sm mt-4 leading-relaxed font-light">
                  Water resistance: 50m<br/>
                  Power reserve: 48 hours<br/>
                  Case diameter: 41mm<br/>
                  Sapphire crystal case back
                </div>
              </details>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 1.2s ease-out forwards;
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in-right {
      animation: slideInRight 0.8s ease-out forwards;
    }
  `]
})
export class ProductDetail {
  product = signal({
    id: '1', 
    name: 'Chronograph Elite', 
    category: 'Watches. Men',
    price: 12500, 
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop',
    description: 'A masterpiece of precision engineering and elegant design. The Chronograph Elite features an in-house movement meticulously decorated by our master artisans.',
    variants: [
      { name: 'Steel', color: '#BCC6CC' },
      { name: 'Rose Gold', color: '#B76E79' },
      { name: 'Yellow Gold', color: '#D4AF37' }
    ]
  });

  selectedVariant = signal<any>(this.product().variants[0]);

  addToCart() {
    console.log('Added to cart', this.selectedVariant());
  }
}
