import { Routes } from '@angular/router';
import { AdminLayout } from '../../layouts/admin-layout/admin-layout';
import { Inventory } from './inventory/inventory';
import { Orders } from './orders/orders';
import { authGuard } from '../../core/guards/auth/auth-guard';
import { roleGuard } from '../../core/guards/role/role-guard';

export const adminRoutes: Routes = [
  { 
    path: '', 
    component: AdminLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Admin' }, // Only access for Admin/Manager
    children: [
      { path: 'inventory', component: Inventory },
      { path: 'orders', component: Orders },
      { path: '', redirectTo: 'inventory', pathMatch: 'full' }
    ]
  }
];
