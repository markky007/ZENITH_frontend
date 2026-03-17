import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  // Home Page
  { path: '', component: Home, pathMatch: 'full' },
  
  // Authentication & Identity
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
  
  // Phase 1: Luxury Product Catalog
  { path: 'products', loadChildren: () => import('./features/products/products.routes').then(m => m.productRoutes) },
  
  // Phase 2: Checkout & Order Management
  { path: 'checkout', loadChildren: () => import('./features/checkout/checkout.routes').then(m => m.checkoutRoutes) },
  
  // Phase 3: User Profiles & Authenticity
  { path: 'profile', loadChildren: () => import('./features/profile/profile.routes').then(m => m.profileRoutes) },
  
  // Phase 4: Admin Back-office
  { path: 'admin', loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes) },
];
