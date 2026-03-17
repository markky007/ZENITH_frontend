import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthStateService } from '../../core/services/auth/auth-state';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="min-h-screen bg-zinc-50 flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-luxury-black text-luxury-white flex flex-col fixed inset-y-0 z-20">
        <div class="h-20 flex items-center justify-center border-b border-zinc-800">
          <span class="font-serif tracking-widest text-2xl text-champagne">ZENITH</span>
        </div>
        <div class="p-6">
          <p class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">Back Office</p>
          <nav class="space-y-2 font-sans text-sm">
            <a routerLink="/admin/inventory" routerLinkActive="text-champagne bg-zinc-800" class="block px-4 py-3 rounded-md text-gray-400 hover:text-luxury-white hover:bg-zinc-800 transition-colors">Inventory</a>
            <a routerLink="/admin/orders" routerLinkActive="text-champagne bg-zinc-800" class="block px-4 py-3 rounded-md text-gray-400 hover:text-luxury-white hover:bg-zinc-800 transition-colors">Orders & Fulfillment</a>
            <!-- Manager Only -->
            <a *ngIf="authState.isManager()" href="javascript:void(0)" class="block px-4 py-3 rounded-md text-gray-400 hover:text-luxury-white hover:bg-zinc-800 transition-colors">Analytics (Manager)</a>
          </nav>
        </div>
        <div class="mt-auto p-6 border-t border-zinc-800">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-champagne font-serif">{{ authState.currentUser()?.email?.charAt(0) | uppercase }}</div>
            <div class="overflow-hidden">
              <p class="text-xs truncate font-medium">{{ authState.currentUser()?.email }}</p>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">{{ authState.currentUser()?.role }}</p>
            </div>
          </div>
          <button (click)="logout()" class="w-full text-left text-xs uppercase tracking-widest text-gray-400 hover:text-luxury-white transition-colors">Sign Out</button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-64 p-8 lg:p-12 font-sans">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AdminLayout {
  authState = inject(AuthStateService);
  router = inject(Router);

  logout() {
    this.authState.logout();
    this.router.navigate(['/auth/login']);
  }
}
