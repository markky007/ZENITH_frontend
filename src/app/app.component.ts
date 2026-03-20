import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDrawer } from './shared/components/cart/cart-drawer/cart-drawer';
import { NavigationMenu, NavItem } from './shared/components/ui/navigation-menu/navigation-menu';
import { CartStateService } from './core/services/cart/cart-state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartDrawer, NavigationMenu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ZENITH';
  
  cart = inject(CartStateService);
  
  navItems = computed<NavItem[]>(() => [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'collection', label: 'Collection', link: '/products' },
    { id: 'admin', label: 'Back Office', link: '/admin' },
    { id: 'profile', label: 'Profile', link: '/profile' },
    { id: 'cart', label: `Cart (${this.cart.totalItems()})`, action: () => this.cart.openDrawer() }
  ]);
}
