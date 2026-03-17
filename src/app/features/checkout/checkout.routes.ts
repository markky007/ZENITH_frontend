import { Routes } from '@angular/router';
import { CheckoutPage } from './checkout-page/checkout-page';
import { OrderTracking } from './order-tracking/order-tracking';

export const checkoutRoutes: Routes = [
  { path: '', component: CheckoutPage },
  { path: 'tracking/:id', component: OrderTracking }
];
