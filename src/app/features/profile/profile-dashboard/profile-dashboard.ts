import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../core/services/auth/auth-state';
import { ZBtn } from '../../../shared/components/ui/z-btn/z-btn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [CommonModule, ZBtn],
  template: `
    <div class="min-h-screen bg-luxury-white pt-24 pb-20 px-4">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16">
        
        <!-- Sidebar Navigation -->
        <div class="w-full md:w-1/4 animate-fade-in-up">
          <div class="sticky top-24">
            <h2 class="font-serif text-2xl text-luxury-black mb-8">My Account</h2>
            <nav class="space-y-2 font-sans tracking-wide text-sm mb-12">
              <a href="javascript:void(0)" class="block py-2 text-luxury-black font-medium border-l-[3px] border-luxury-black pl-4">Dashboard</a>
              <a href="javascript:void(0)" class="block py-2 text-gray-500 hover:text-luxury-black transition-colors pl-4 border-l-[3px] border-transparent">Order History</a>
              <a href="javascript:void(0)" class="block py-2 text-gray-500 hover:text-luxury-black transition-colors pl-4 border-l-[3px] border-transparent">Wishlist</a>
              <a href="javascript:void(0)" class="block py-2 text-gray-500 hover:text-luxury-black transition-colors pl-4 border-l-[3px] border-transparent">Settings</a>
            </nav>
            <div>
              <button (click)="logout()" class="text-xs uppercase tracking-widest text-gray-400 hover:text-luxury-black transition-colors focus:outline-none">Sign Out</button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="w-full md:w-3/4 animate-fade-in-up" style="animation-delay: 0.1s">
          
          <!-- Welcome & Tier -->
          <div class="bg-zinc-50 p-8 lg:p-12 border border-platinum mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p class="font-sans text-sm text-gray-500 tracking-wide mb-2">Welcome back,</p>
              <h1 class="font-serif text-3xl md:text-4xl text-luxury-black">{{ (authState.currentUser()?.email || 'Valued Client').split('@')[0] | titlecase }}</h1>
            </div>
            
            <!-- Tier Badge Dynamic Styling-->
            <div class="flex flex-col items-center">
              <div class="w-20 h-20 rounded-full flex items-center justify-center border-4"
                   [ngClass]="{
                     'border-gray-300 bg-gray-100 text-gray-500': tier === 'Silver',
                     'border-champagne-dark bg-[#FFF8DC] text-champagne-dark': tier === 'Gold',
                     'border-luxury-black bg-luxury-black text-luxury-white': tier === 'VIP'
                   }">
                <span class="font-serif text-2xl font-semibold">{{ tier.charAt(0) }}</span>
              </div>
              <span class="mt-3 font-sans text-xs uppercase tracking-widest font-semibold"
                    [ngClass]="{
                     'text-gray-500': tier === 'Silver',
                     'text-champagne-dark': tier === 'Gold',
                     'text-luxury-black': tier === 'VIP'
                   }">{{ tier }} Member</span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Recent Orders -->
            <div class="border border-platinum p-8 bg-white shadow-sm">
               <h3 class="font-serif text-xl text-luxury-black mb-6 border-b border-platinum pb-4">Recent Orders</h3>
               <div class="space-y-4 font-sans text-sm">
                 <div class="flex justify-between items-center pb-4 border-b border-platinum/50">
                    <div>
                      <p class="text-luxury-black font-medium">Order #10001</p>
                      <p class="text-gray-500 mt-1">Placed Today</p>
                    </div>
                    <z-btn variant="ghost" size="sm" (clicked)="viewOrder('10001')">TRACK</z-btn>
                 </div>
                 <div class="flex justify-between items-center pb-4 border-b border-platinum/50">
                    <div>
                      <p class="text-luxury-black font-medium">Order #09882</p>
                      <p class="text-gray-500 mt-1">Delivered Oct 12, 2025</p>
                    </div>
                    <z-btn variant="ghost" size="sm">VIEW</z-btn>
                 </div>
               </div>
               <button class="mt-6 text-xs font-sans uppercase tracking-widest text-luxury-black hover:text-champagne-dark transition-colors border-b border-transparent hover:border-champagne-dark font-medium pb-1">View All Orders</button>
            </div>
            
            <!-- Authenticity -->
            <div class="border border-platinum p-8 bg-luxury-black text-luxury-white shadow-lg">
               <h3 class="font-serif text-xl mb-6 border-b border-zinc-800 pb-4 text-champagne relative">
                 Digital Certificates
                 <span class="absolute top-0 right-0 w-2 h-2 bg-champagne rounded-full animate-pulse"></span>
               </h3>
               <p class="font-sans text-sm text-gray-400 leading-relaxed mb-6 font-light">
                 Access the secure cryptographic proof of authenticity for your ZENITH timepieces.
               </p>
               <div class="flex items-center gap-4 mb-8">
                 <div class="w-12 h-12 bg-zinc-800 flex items-center justify-center rounded-sm">
                   <svg class="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                 </div>
                 <div>
                   <p class="font-sans font-medium text-luxury-white">1 Verified Item</p>
                 </div>
               </div>
               <z-btn variant="secondary" size="md" [block]="true" (clicked)="viewCertificates()">VIEW CERTIFICATE</z-btn>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `]
})
export class ProfileDashboard {
  authState = inject(AuthStateService);
  router = inject(Router);
  
  tier = 'VIP'; // In real app, derived from authState

  logout() {
    this.authState.logout();
    this.router.navigate(['/auth/login']);
  }
  
  viewOrder(id: string) {
    this.router.navigate(['/checkout/tracking', id]);
  }
  
  viewCertificates() {
    this.router.navigate(['/profile/authenticity']);
  }
}
