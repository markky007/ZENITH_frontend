import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../components/product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  template: `
    <div class="min-h-screen bg-luxury-white pt-24 pb-20">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto px-6 mb-16 animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl font-serif text-luxury-black mb-4 tracking-wider uppercase">ZENITH</h1>
        <p class="font-sans text-gray-500 tracking-wide">Discover our latest masterpieces, crafted for eternity.</p>

        <!-- Filters -->
        <div class="flex flex-wrap justify-center gap-6 mt-10 font-sans text-sm tracking-widest uppercase">
          <button class="text-luxury-black font-semibold border-b border-luxury-black pb-1">All</button>
          <button class="text-gray-400 hover:text-luxury-black transition-colors pb-1">Watches</button>
          <button class="text-gray-400 hover:text-luxury-black transition-colors pb-1">Jewelry</button>
          <button class="text-gray-400 hover:text-luxury-black transition-colors pb-1">Accessories</button>
        </div>
      </div>

      <!-- Grid -->
      <div class="container mx-auto px-6 lg:px-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
  `]
})
export class ProductList {
  products = signal([
    { id: '1', name: 'Chronograph Elite', category: 'Watches', price: 12500, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop' },
    { id: '2', name: 'Rose Gold Maestro', category: 'Watches', price: 18000, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop' },
    { id: '3', name: 'Platinum Perpetual', category: 'Watches', price: 24000, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop' },
    { id: '4', name: 'Classique Diamond', category: 'Watches', price: 32000, image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop' }
  ]);
}
