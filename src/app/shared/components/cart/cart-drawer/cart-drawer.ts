import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartStateService } from '../../../../core/services/cart/cart-state';
import { ZDrawer } from '../../ui/z-drawer/z-drawer';
import { ZBtn } from '../../ui/z-btn/z-btn';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, ZDrawer, ZBtn],
  template: `
    <z-drawer 
      [isOpen]="cart.isDrawerOpen()" 
      title="YOUR BAG ({{ cart.totalItems() }})"
      (closed)="cart.closeDrawer()">
      
      <div class="flex flex-col h-full font-sans">
        @if (cart.items().length === 0) {
          <div class="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-60">
            <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <p class="text-luxury-black font-serif text-lg">Your bag is empty.</p>
            <p class="text-gray-500 mt-2 text-sm tracking-wide">Ready to discover our collections?</p>
            <z-btn variant="outline" size="md" class="mt-8" (clicked)="cart.closeDrawer(); navigateToProducts()">CONTINUE SHOPPING</z-btn>
          </div>
        } @else {
          <div class="flex-1 overflow-y-auto pr-2 pb-6 space-y-6">
            @for (item of cart.items(); track item.id) {
              <div class="flex gap-4 border-b border-platinum/50 pb-6 animate-fade-in-up">
                <img [src]="item.image" [alt]="item.name" class="w-24 h-24 object-cover bg-zinc-50" />
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start">
                      <h4 class="font-serif text-luxury-black font-semibold">{{ item.name }}</h4>
                      <button (click)="cart.removeItem(item.id)" class="text-gray-400 hover:text-red-500 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                    <p class="text-xs text-gray-500 tracking-widest uppercase mt-1">{{ item.variant }}</p>
                  </div>
                  <div class="flex justify-between items-end mt-4">
                    <div class="flex items-center border border-platinum rounded-sm">
                      <button (click)="cart.updateQuantity(item.id, item.quantity - 1)" class="px-2 py-1 text-gray-500 hover:text-luxury-black hover:bg-zinc-50 transition-colors">-</button>
                      <span class="px-2 py-1 text-sm w-8 text-center">{{ item.quantity }}</span>
                      <button (click)="cart.updateQuantity(item.id, item.quantity + 1)" class="px-2 py-1 text-gray-500 hover:text-luxury-black hover:bg-zinc-50 transition-colors">+</button>
                    </div>
                    <span class="font-medium text-luxury-black">{{ item.price * item.quantity | currency:'USD' }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
          
          <!-- Summary -->
          <div class="pt-6 border-t border-luxury-black/10 mt-auto bg-white">
            <div class="flex justify-between items-center mb-6">
              <span class="text-gray-500 uppercase tracking-widest text-sm">Subtotal</span>
              <span class="font-serif text-xl font-medium text-luxury-black">{{ cart.subtotal() | currency:'USD' }}</span>
            </div>
            <p class="text-xs text-gray-400 mb-6 text-center tracking-wide">Shipping and taxes calculated at checkout.</p>
            <z-btn variant="primary" size="lg" [block]="true" (clicked)="checkout()">
              PROCEED TO SECURE CHECKOUT
            </z-btn>
          </div>
        }
      </div>
    </z-drawer>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.4s ease-out forwards;
    }
  `]
})
export class CartDrawer {
  cart = inject(CartStateService);
  private router = inject(Router);

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  checkout() {
    this.cart.closeDrawer();
    this.router.navigate(['/checkout']);
  }
}
