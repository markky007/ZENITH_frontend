import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-luxury-white pt-32 pb-24 px-6 flex items-center justify-center font-sans tracking-wide">
      <div class="max-w-2xl w-full mx-auto animate-fade-in-up">
        
        <div class="text-center mb-20">
          <p class="text-champagne-dark text-sm uppercase tracking-widest font-semibold mb-6">Confirmed</p>
          <h1 class="text-5xl md:text-6xl font-serif text-luxury-black mb-6">Thank You</h1>
          <p class="text-gray-500 font-light leading-relaxed">Your order <span class="text-luxury-black font-medium">#10001</span> has been received and is being processed.<br/>An email confirmation has been sent to your registered address.</p>
        </div>

        <div class="relative py-10">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-[80%] top-[10%] w-[1px] bg-platinum"></div>
          
          <!-- Step 1: Order Placed -->
          <div class="relative flex items-center justify-center mb-20 group">
            <div class="absolute right-1/2 pr-12 text-right w-1/2 opacity-100 transition-opacity">
              <h4 class="font-serif text-xl text-luxury-black mb-1">Order Placed</h4>
              <p class="text-xs text-gray-400 font-medium">Today, 10:24 AM</p>
            </div>
            <div class="bg-luxury-black w-3 h-3 rounded-full relative z-10 box-content border-[6px] border-luxury-white shadow-[0_0_0_1px_rgba(15,15,15,0.1)]"></div>
            <div class="absolute left-1/2 pl-12 text-left w-1/2"></div>
          </div>

          <!-- Step 2: Quality Inspection -->
          <div class="relative flex items-center justify-center mb-20 group">
            <div class="absolute right-1/2 pr-12 text-right w-1/2"></div>
            <div class="bg-luxury-white w-3 h-3 rounded-full relative z-10 box-content border-[6px] border-luxury-white shadow-[0_0_0_1px_rgba(15,15,15,0.2)]"></div>
            <div class="absolute left-1/2 pl-12 text-left w-1/2">
              <h4 class="font-serif text-xl text-gray-400 group-hover:text-luxury-black transition-colors">Quality Inspection</h4>
              <p class="text-xs text-gray-400 font-medium mt-1">Pending Master Watchmaker</p>
            </div>
          </div>

          <!-- Step 3: Secure Transport -->
          <div class="relative flex items-center justify-center mb-20 group">
            <div class="absolute right-1/2 pr-12 text-right w-1/2">
              <h4 class="font-serif text-xl text-gray-400 group-hover:text-luxury-black transition-colors">Secure Transport</h4>
              <p class="text-xs text-gray-400 font-medium mt-1">Awaiting Armored Courier</p>
            </div>
            <div class="bg-luxury-white w-3 h-3 rounded-full relative z-10 box-content border-[6px] border-luxury-white shadow-[0_0_0_1px_rgba(15,15,15,0.2)]"></div>
            <div class="absolute left-1/2 pl-12 text-left w-1/2"></div>
          </div>

          <!-- Step 4: Delivered -->
          <div class="relative flex items-center justify-center group">
            <div class="absolute right-1/2 pr-12 text-right w-1/2"></div>
            <div class="bg-luxury-white w-3 h-3 rounded-full relative z-10 box-content border-[6px] border-luxury-white shadow-[0_0_0_1px_rgba(15,15,15,0.2)]"></div>
            <div class="absolute left-1/2 pl-12 text-left w-1/2">
              <h4 class="font-serif text-xl text-gray-400 group-hover:text-luxury-black transition-colors">Delivery</h4>
              <p class="text-xs text-gray-400 font-medium mt-1">Signature Required</p>
            </div>
          </div>
        </div>
        
        <div class="mt-24 text-center">
          <a href="/products" class="inline-block border border-luxury-black text-luxury-black font-medium text-xs tracking-widest uppercase px-10 py-4 hover:bg-luxury-black hover:text-luxury-white transition-all duration-300">
            CONTINUE SHOPPING
          </a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class OrderTracking {
}
