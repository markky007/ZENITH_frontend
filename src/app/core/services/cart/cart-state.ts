import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private readonly _items = signal<CartItem[]>([]);
  private readonly _isDrawerOpen = signal<boolean>(false);
  
  readonly items = computed(() => this._items());
  readonly isDrawerOpen = computed(() => this._isDrawerOpen());
  readonly totalItems = computed(() => this._items().reduce((acc, curr) => acc + curr.quantity, 0));
  readonly subtotal = computed(() => this._items().reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));

  addItem(item: Omit<CartItem, 'id'>) {
    const existing = this._items().find(i => i.productId === item.productId && i.variant === item.variant);
    if (existing) {
      this.updateQuantity(existing.id, existing.quantity + item.quantity);
    } else {
      this._items.update(items => [...items, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
    }
    this.openDrawer();
  }

  removeItem(id: string) {
    this._items.update(items => items.filter(i => i.id !== id));
  }

  updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }
    this._items.update(items => items.map(i => i.id === id ? { ...i, quantity } : i));
  }

  clear() {
    this._items.set([]);
  }

  openDrawer() {
    this._isDrawerOpen.set(true);
  }

  closeDrawer() {
    this._isDrawerOpen.set(false);
  }
}
