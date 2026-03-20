import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZBtn } from '../../shared/components/ui/z-btn/z-btn';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ZBtn],
  template: `
    <main
      class="bg-luxury-black text-luxury-white min-h-screen font-sans selection:bg-champagne selection:text-black"
    >
      <!-- HERO SECTION -->
      <section
        class="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div class="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2000&auto=format&fit=crop"
            class="w-full h-full object-cover opacity-50 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
            alt="Hero Background"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-black/40 to-luxury-black"
          ></div>
        </div>

        <div
          class="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
        >
          <span
            class="inline-block text-xs uppercase tracking-[0.4em] text-champagne mb-8 border-b border-champagne/40 pb-2 animate-fade-in-up"
            style="animation-delay: 0.2s"
          >
            The Pinnacle of Horology
          </span>
          <h1
            class="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 leading-none drop-shadow-2xl animate-fade-in-up flex flex-col items-center"
            style="animation-delay: 0.4s"
          >
            <span
              class="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
              >Timeless</span
            >
            <span class="text-champagne-dark italic font-medium ml-12 md:ml-24"
              >Precision</span
            >
          </h1>
          <p
            class="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-12 tracking-wide font-light leading-relaxed animate-fade-in-up"
            style="animation-delay: 0.6s"
          >
            Discover the ultimate convergence of visionary engineering,
            avant-garde design, and enduring authenticity. Engineered for
            eternity.
          </p>
        </div>

        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-70">
          <div class="flex flex-col items-center gap-4 animate-bounce">
            <span class="text-[9px] uppercase tracking-[0.3em] text-gray-400"
              >Scroll down</span
            >
            <div
              class="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent"
            ></div>
          </div>
        </div>
      </section>

      <!-- FEATURED COLLECTION -->
      <section class="py-32 px-6 md:px-12 bg-luxury-black relative">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20 scroll-reveal" #revealElement>
            <h2 class="text-3xl md:text-5xl font-serif mb-4 text-white">
              Iconic Timepieces
            </h2>
            <div class="w-12 h-[1px] bg-champagne mx-auto mb-6"></div>
            <p class="text-gray-400 tracking-widest uppercase text-xs">
              Curated Selection
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            @for (item of featuredWatches; track item.id; let i = $index) {
              <div
                class="group cursor-pointer scroll-reveal"
                #revealElement
                [style.transition-delay]="i * 150 + 'ms'"
                routerLink="/products"
              >
                <div
                  class="relative overflow-hidden aspect-[3/4] mb-6 bg-zinc-900 border border-white/5 group-hover:border-champagne/30 transition-colors duration-500"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10"
                  ></div>
                  <img
                    [src]="item.image"
                    [alt]="item.name"
                    class="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />

                  <div
                    class="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] bg-black/20"
                  >
                    <span
                      class="uppercase tracking-widest text-xs border border-white px-6 py-3 bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      View Details
                    </span>
                  </div>
                </div>

                <div class="text-center">
                  <span
                    class="text-[10px] uppercase tracking-[0.2em] text-champagne mb-2 block"
                    >{{ item.collection }}</span
                  >
                  <h3
                    class="font-serif tracking-wide text-xl text-gray-100 mb-2 group-hover:text-champagne transition-colors duration-300"
                  >
                    {{ item.name }}
                  </h3>
                  <p class="text-sm tracking-wider text-gray-500 font-light">
                    {{ item.price }}
                  </p>
                </div>
              </div>
            }
          </div>

          <div class="mt-20 flex justify-center scroll-reveal" #revealElement>
            <a
              routerLink="/products"
              class="inline-flex items-center gap-4 text-xs tracking-widest uppercase text-gray-300 hover:text-champagne transition-colors group"
            >
              <span>View Full Collection</span>
              <span
                class="w-8 h-[1px] bg-gray-500 group-hover:bg-champagne transition-colors group-hover:w-12 duration-300"
              ></span>
            </a>
          </div>
        </div>
      </section>

      <!-- ART OF WATCHMAKING (SPLIT) -->
      <section class="py-0 md:py-20 relative bg-luxury-black">
        <div class="flex flex-col lg:flex-row">
          <div
            class="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1508057198894-247b23fe5278?auto=format&fit=crop&q=80&w=1600"
              alt="Master Craftsman"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-[20s]"
            />
            <div class="absolute inset-0 bg-black/30 lg:hidden"></div>
          </div>
          <div
            class="w-full lg:w-1/2 flex items-center bg-zinc-950 p-12 lg:p-24 relative"
          >
            <div
              class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent lg:hidden"
            ></div>
            <div class="max-w-xl scroll-reveal" #revealElement>
              <span
                class="text-champagne text-xs uppercase tracking-[0.3em] font-medium mb-6 block"
                >The Atelier</span
              >
              <h2
                class="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight"
              >
                Heritage Meets <br /><span
                  class="italic font-light text-gray-400"
                  >Innovation</span
                >
              </h2>
              <p
                class="text-gray-400 font-light leading-relaxed mb-8 tracking-wide text-sm md:text-base"
              >
                Every Zenith timepiece is a masterpiece of micro-engineering.
                Our master watchmakers dedicate hundreds of hours to assembling
                movements containing up to 400 components, some thinner than a
                human hair.
              </p>
              <p
                class="text-gray-400 font-light leading-relaxed mb-12 tracking-wide text-sm md:text-base"
              >
                This relentless pursuit of perfection in our Swiss ateliers
                ensures that you are not just wearing a watch, but inheriting a
                legacy of uncompromising excellence.
              </p>

              <z-btn
                variant="outline"
                btnClass="!text-luxury-white border border-luxury-white/20 hover:bg-luxury-white hover:!text-black transition-colors"
                routerLink="/about"
              >
                <span class="uppercase tracking-widest text-xs"
                  >Discover Our History</span
                >
              </z-btn>
            </div>
          </div>
        </div>
      </section>

      <!-- EXPERTISE HIGHLIGHT -->
      <section class="py-32 relative overflow-hidden bg-luxury-black">
        <div
          class="absolute inset-0 border-y border-white/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-luxury-black to-luxury-black"
        ></div>

        <div class="relative z-10 max-w-6xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div class="scroll-reveal" #revealElement>
              <div
                class="w-16 h-16 mx-auto border border-champagne/30 rounded-full flex items-center justify-center mb-6"
              >
                <svg
                  class="w-6 h-6 text-champagne"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h4 class="text-white uppercase tracking-widest text-sm mb-4">
                Certified Authentic
              </h4>
              <p class="text-gray-500 font-light text-sm leading-relaxed">
                Each piece is individually verified and certified on the
                blockchain for indisputable provenance.
              </p>
            </div>

            <div
              class="scroll-reveal"
              #revealElement
              [style.transition-delay]="'150ms'"
            >
              <div
                class="w-16 h-16 mx-auto border border-champagne/30 rounded-full flex items-center justify-center mb-6"
              >
                <svg
                  class="w-6 h-6 text-champagne"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h4 class="text-white uppercase tracking-widest text-sm mb-4">
                Swiss Precision
              </h4>
              <p class="text-gray-500 font-light text-sm leading-relaxed">
                COSC-certified chronometers guaranteeing absolute unyielding
                accuracy under extreme conditions.
              </p>
            </div>

            <div
              class="scroll-reveal"
              #revealElement
              [style.transition-delay]="'300ms'"
            >
              <div
                class="w-16 h-16 mx-auto border border-champagne/30 rounded-full flex items-center justify-center mb-6"
              >
                <svg
                  class="w-6 h-6 text-champagne"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
              </div>
              <h4 class="text-white uppercase tracking-widest text-sm mb-4">
                Global Warranty
              </h4>
              <p class="text-gray-500 font-light text-sm leading-relaxed">
                A comprehensive 5-year international warranty paired with
                complimentary concierge service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      @keyframes slowZoom {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.1);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        opacity: 0;
        animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      /* Scroll Reveal Classes */
      .scroll-reveal {
        opacity: 0;
        transform: translateY(50px);
        transition:
          opacity 1s cubic-bezier(0.25, 1, 0.5, 1),
          transform 1s cubic-bezier(0.25, 1, 0.5, 1);
        will-change: opacity, transform;
      }

      .scroll-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `,
  ],
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChildren('revealElement') revealElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  featuredWatches = [
    {
      id: 1,
      name: 'Chronograph X-1',
      collection: 'Vanguard Collection',
      price: '$12,500',
      image:
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      name: 'Aqua Marine Tourbillon',
      collection: 'Oceanic Series',
      price: '$28,000',
      image:
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 3,
      name: 'Midnight Elegance',
      collection: 'Heritage Line',
      price: '$9,800',
      image:
        'https://images.unsplash.com/photo-1587836141604-fa9cd6385a86?auto=format&fit=crop&q=80&w=800',
    },
  ];

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    // Only run in browser environment
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once revealed to keep it visible
            this.observer?.unobserve(entry.target);
          }
        });
      }, options);

      this.revealElements.forEach((el) => {
        this.observer?.observe(el.nativeElement);
      });
    } else {
      // Fallback for SSR or if IntersectionObserver is not supported
      this.revealElements.forEach((el) => {
        el.nativeElement.classList.add('visible');
      });
    }
  }
}
