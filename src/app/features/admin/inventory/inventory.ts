import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ZBtn } from '../../../shared/components/ui/z-btn/z-btn';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ZBtn],
  template: `
    <div class="animate-fade-in-up">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="font-serif text-3xl text-luxury-black mb-1">Inventory Management</h1>
          <p class="text-gray-500 text-sm tracking-wide">Manage product catalogue and stock levels.</p>
        </div>
        <z-btn variant="primary" size="sm">+ ADD PRODUCT</z-btn>
      </div>

      <div class="bg-white border border-platinum shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead class="bg-zinc-50 border-b border-platinum text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th class="px-6 py-4 font-medium">Product</th>
                <th class="px-6 py-4 font-medium">SKU</th>
                <th class="px-6 py-4 font-medium">Category</th>
                <th class="px-6 py-4 font-medium">Price</th>
                <th class="px-6 py-4 font-medium">Stock</th>
                <th class="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-platinum">
              @for (item of products(); track item.id) {
                <tr class="hover:bg-zinc-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <img [src]="item.image" class="w-10 h-10 object-cover bg-zinc-100 rounded-sm" />
                      <span class="font-medium text-luxury-black">{{ item.name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-500 font-mono text-xs">{{ item.sku }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ item.category }}</td>
                  <td class="px-6 py-4 text-luxury-black font-medium">{{ item.price | currency:'USD' }}</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium" 
                          [ngClass]="item.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ item.stock }} in stock
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button class="text-champagne-dark hover:text-luxury-black transition-colors text-xs uppercase tracking-widest font-semibold mr-4">Edit</button>
                    <button class="text-red-500 hover:text-red-700 transition-colors text-xs uppercase tracking-widest font-semibold">Delete</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
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
      animation: fadeInUp 0.4s ease-out forwards;
    }
  `]
})
export class Inventory {
  products = signal([
    { id: '1', name: 'Chronograph Elite', sku: 'CH-EL-9921', category: 'Watches', price: 12500, stock: 15, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&auto=format&fit=crop' },
    { id: '2', name: 'Rose Gold Maestro', sku: 'RG-MA-4420', category: 'Watches', price: 18000, stock: 4, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&auto=format&fit=crop' },
    { id: '3', name: 'Platinum Perpetual', sku: 'PL-PE-8811', category: 'Watches', price: 24000, stock: 2, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=200&auto=format&fit=crop' },
  ]);
}
