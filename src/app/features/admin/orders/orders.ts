import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  template: `
    <div class="animate-fade-in-up">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="font-serif text-3xl text-luxury-black mb-1">Orders & Fulfillment</h1>
          <p class="text-gray-500 text-sm tracking-wide">Process orders through the fulfillment state machine.</p>
        </div>
      </div>

      <div class="bg-white border border-platinum shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead class="bg-zinc-50 border-b border-platinum text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th class="px-6 py-4 font-medium">Order ID</th>
                <th class="px-6 py-4 font-medium">Date</th>
                <th class="px-6 py-4 font-medium">Customer</th>
                <th class="px-6 py-4 font-medium">Total</th>
                <th class="px-6 py-4 font-medium">Status</th>
                <th class="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-platinum">
              @for (order of orders(); track order.id) {
                <tr class="hover:bg-zinc-50 transition-colors">
                  <td class="px-6 py-4 font-mono text-luxury-black font-medium">#{{ order.id }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ order.date | date:'mediumDate' }}</td>
                  <td class="px-6 py-4 text-luxury-black">{{ order.customer }}</td>
                  <td class="px-6 py-4 text-luxury-black font-medium">{{ order.total | currency:'USD' }}</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2 py-1 rounded-sm text-[10px] tracking-widest uppercase font-bold border"
                          [ngClass]="{
                            'bg-amber-50 text-amber-700 border-amber-200': order.status === 'Pending Placement',
                            'bg-blue-50 text-blue-700 border-blue-200': order.status === 'Quality Inspection',
                            'bg-purple-50 text-purple-700 border-purple-200': order.status === 'Secure Transport',
                            'bg-green-50 text-green-700 border-green-200': order.status === 'Delivered'
                          }">
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button class="text-luxury-black border-b border-luxury-black hover:text-champagne-dark hover:border-champagne-dark transition-all text-xs uppercase tracking-widest font-semibold pb-0.5">
                      Process
                    </button>
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
export class Orders {
  orders = signal([
    { id: '10001', date: new Date(), customer: 'admin@zenith.com', total: 12500, status: 'Pending Placement' },
    { id: '09998', date: new Date(Date.now() - 86400000), customer: 'client@example.com', total: 24000, status: 'Quality Inspection' },
    { id: '09985', date: new Date(Date.now() - 2 * 86400000), customer: 'vip@example.com', total: 42000, status: 'Secure Transport' },
    { id: '09882', date: new Date(Date.now() - 5 * 86400000), customer: 'user@zenith.com', total: 18000, status: 'Delivered' },
  ]);
}
