import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDrawer } from './shared/components/cart/cart-drawer/cart-drawer';
import { NavigationMenu, NavItem } from './shared/components/ui/navigation-menu/navigation-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartDrawer, NavigationMenu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ZENITH';
  
  navItems = signal<NavItem[]>([
    { id: 'home', label: 'Home', link: '/' },
    { id: 'collection', label: 'Collection', link: '/products' },
    { id: 'profile', label: 'My Account', link: '/profile' },
    { id: 'admin', label: 'Back Office', link: '/admin' }
  ]);
}
