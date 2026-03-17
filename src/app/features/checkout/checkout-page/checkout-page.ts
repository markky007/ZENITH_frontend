import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ZBtn } from '../../../shared/components/ui/z-btn/z-btn';
import { ZInput } from '../../../shared/components/ui/z-input/z-input';
import { CartStateService } from '../../../core/services/cart/cart-state';
import { inject } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, ZBtn, ZInput],
  template: `
    <div class="min-h-screen bg-luxury-white pt-24 pb-20 px-4">
      <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        <!-- Main Form Column -->
        <div class="flex-1 lg:w-2/3 animate-fade-in-up">
          
          <!-- Steps Header -->
          <div class="flex items-center justify-between border-b border-platinum pb-6 mx-auto mb-10 max-w-2xl font-sans tracking-widest text-xs uppercase font-semibold">
            <div [class.text-luxury-black]="step() >= 1" [class.text-gray-400]="step() < 1">Delivery</div>
            <div class="flex-1 border-t border-platinum mx-4 hidden sm:block"></div>
            <div [class.text-luxury-black]="step() >= 2" [class.text-gray-400]="step() < 2">Verification</div>
            <div class="flex-1 border-t border-platinum mx-4 hidden sm:block"></div>
            <div [class.text-luxury-black]="step() >= 3" [class.text-gray-400]="step() < 3">Payment</div>
          </div>

          <!-- Step 1: Shipping -->
          <div *ngIf="step() === 1" class="transition-opacity duration-300">
            <h2 class="text-3xl font-serif text-luxury-black mb-8">Shipping Information</h2>
            <div class="grid grid-cols-2 gap-6">
              <z-input label="First Name" [(value)]="shipping.firstName"></z-input>
              <z-input label="Last Name" [(value)]="shipping.lastName"></z-input>
              <div class="col-span-2">
                <z-input label="Address" [(value)]="shipping.address"></z-input>
              </div>
              <z-input label="City" [(value)]="shipping.city"></z-input>
              <z-input label="Postal Code" [(value)]="shipping.postalCode"></z-input>
              <div class="col-span-2">
                <z-input label="Country" [(value)]="shipping.country"></z-input>
              </div>
            </div>
            <div class="mt-10">
              <z-btn variant="primary" size="lg" (clicked)="step.set(2)">CONTINUE TO VERIFICATION</z-btn>
            </div>
          </div>

          <!-- Step 2: Verification -->
          <div *ngIf="step() === 2" class="transition-opacity duration-300">
             <h2 class="text-3xl font-serif text-luxury-black mb-8">Identity Verification</h2>
             <p class="text-gray-500 font-sans tracking-wide mb-8 leading-relaxed">Due to the exceptional value of your selected pieces, ZENITH requires an identity verification step to ensure a secure transaction and delivery process.</p>
             
             <div class="border border-platinum p-8 bg-zinc-50 flex flex-col items-center justify-center mb-8">
                <svg class="w-12 h-12 text-champagne-dark mb-4 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4h.002M8 4v.01M8 4h.002"></path></svg>
                <p class="font-serif text-xl text-luxury-black mb-2">Secure Identity Check</p>
                <p class="font-sans text-sm text-gray-500 mb-6 text-center max-w-sm">Please have your ID or Passport ready for our secure third-party partner to verify.</p>
                <z-btn variant="outline">START VERIFICATION</z-btn>
             </div>
             
             <div class="flex gap-4 mt-10">
               <z-btn variant="ghost" (clicked)="step.set(1)">BACK</z-btn>
               <z-btn variant="primary" size="lg" (clicked)="step.set(3)">SKIP FOR DEMO</z-btn>
             </div>
          </div>

          <!-- Step 3: Payment -->
          <div *ngIf="step() === 3" class="transition-opacity duration-300">
             <h2 class="text-3xl font-serif text-luxury-black mb-8">Secure Payment</h2>
             <div class="space-y-6">
                <z-input label="Cardholder Name"></z-input>
                <z-input label="Card Number"></z-input>
                <div class="grid grid-cols-2 gap-6">
                  <z-input label="Expiry Date (MM/YY)"></z-input>
                  <z-input label="CVV"></z-input>
                </div>
             </div>
             <p class="text-xs text-gray-400 mt-6 tracking-wide font-sans leading-relaxed">Your payment is processed securely. We employ end-to-end encryption to protect your financial details. ZENITH will never store your complete card data.</p>
             <div class="flex gap-4 mt-10">
               <z-btn variant="ghost" (clicked)="step.set(2)">BACK</z-btn>
               <z-btn variant="primary" size="lg" [disabled]="isProcessing()" (clicked)="placeOrder()">
                 {{ isProcessing() ? 'PROCESSING...' : 'COMPLETE ORDER (' + (cart.subtotal() | currency:'USD') + ')' }}
               </z-btn>
             </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:w-1/3 border-l border-platinum pl-0 lg:pl-12 pt-12 lg:pt-0">
          <h3 class="font-serif text-xl text-luxury-black mb-6 border-b border-platinum pb-4 tracking-wide">Order Summary</h3>
          <div class="space-y-6 max-h-[50vh] overflow-y-auto pr-4 mb-6 scrollbar-hide">
             <div *ngFor="let item of cart.items()" class="flex gap-4">
                <img [src]="item.image" class="w-20 h-20 object-cover bg-zinc-50 border border-gray-100" />
                <div>
                  <h4 class="font-serif tracking-wide text-sm">{{ item.name }}</h4>
                  <p class="text-gray-500 text-xs tracking-widest uppercase mt-1">QTY: {{ item.quantity }}</p>
                  <p class="font-sans font-medium text-sm mt-2">{{ item.price * item.quantity | currency:'USD' }}</p>
                </div>
             </div>
          </div>
          <div class="border-t border-platinum pt-4 space-y-4 font-sans text-sm text-gray-600 tracking-wide">
             <div class="flex justify-between">
               <span>Subtotal</span>
               <span>{{ cart.subtotal() | currency:'USD' }}</span>
             </div>
             <div class="flex justify-between">
               <span>Premium Delivery</span>
               <span>Complimentary</span>
             </div>
             <div class="flex justify-between items-center text-luxury-black font-semibold text-lg border-t border-platinum/50 pt-4">
               <span class="font-serif tracking-wide">Total</span>
               <span class="font-sans">{{ cart.subtotal() | currency:'USD' }}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }
  `]
})
export class CheckoutPage {
  cart = inject(CartStateService);
  private router = inject(Router);
  
  step = signal(1);
  isProcessing = signal(false);
  
  shipping = { firstName: '', lastName: '', address: '', city: '', postalCode: '', country: '' };

  placeOrder() {
    this.isProcessing.set(true);
    setTimeout(() => {
      this.isProcessing.set(false);
      this.cart.clear();
      this.router.navigate(['/checkout/tracking/10001']);
    }, 2000);
  }
}
