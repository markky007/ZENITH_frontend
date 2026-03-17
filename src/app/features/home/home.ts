import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZBtn } from '../../shared/components/ui/z-btn/z-btn';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ZBtn],
  template: `
    <div
      class="relative min-h-screen bg-luxury-black flex items-center justify-center overflow-hidden"
    >
      <!-- Background Video Placeholder or Parallax Image -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2000&auto=format&fit=crop"
          class="w-full h-full object-cover opacity-40 blur-[2px] transition-transform duration-[10s] hover:scale-105"
          alt="Background"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/60"
        ></div>
      </div>

      <!-- Hero Content -->
      <div
        class="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up"
      >
        <span
          class="inline-block font-sans text-xs uppercase tracking-[0.3em] text-champagne mb-6 border border-champagne px-4 py-1.5 rounded-sm"
          >Master of Chronographs</span
        >
        <h1
          class="font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-white mb-6 leading-tight drop-shadow-xl"
        >
          Timeless<br /><span class="text-champagne-dark italic"
            >Precision</span
          >
        </h1>
        <p
          class="font-sans text-gray-400 text-sm md:text-base max-w-lg mx-auto mb-10 tracking-wide font-light leading-relaxed"
        >
          Discover the ultimate convergence of visionary engineering,
          avant-garde design, and enduring authenticity.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <z-btn variant="primary" routerLink="/products"
            >EXPLORE COLLECTION</z-btn
          >
          <z-btn
            variant="ghost"
            btnClass="!text-luxury-white border border-luxury-white/20 hover:bg-luxury-white hover:!text-black transition-colors"
            routerLink="/profile/authenticity"
            >VERIFY AUTHENTICITY</z-btn
          >
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 -translate-y-4 animate-bounce"
      >
        <span
          class="font-sans text-[10px] uppercase tracking-widest text-gray-500"
          >Scroll</span
        >
        <div
          class="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `,
  ],
})
export class Home {}
