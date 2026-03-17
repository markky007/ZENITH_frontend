import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticity-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-zinc-50 pt-32 pb-20 px-4 flex flex-col justify-center">
      <div class="max-w-4xl mx-auto w-full animate-fade-in-up">
        
        <div class="text-center mb-16">
          <h1 class="text-3xl md:text-4xl font-serif text-luxury-black mb-4 tracking-wide">Digital Authenticity</h1>
          <p class="font-sans text-gray-500 max-w-lg mx-auto leading-relaxed">Cryptographically secured certificates verifying the provenance, materials, and ownership history of your timepieces.</p>
        </div>

        <!-- Certificate Card -->
        <div class="bg-luxury-white shadow-2xl p-1 md:p-2 max-w-2xl mx-auto group perspective-1000">
          <div class="border border-platinum p-8 md:p-12 relative overflow-hidden bg-[#fafafa] transition-transform duration-700 hover:rotate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            
            <!-- Watermark -->
            <div class="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <span class="text-8xl font-serif rotate-45 tracking-widest">ZENITH</span>
            </div>
            
            <div class="relative z-10">
              <div class="flex flex-col sm:flex-row justify-between items-start mb-12 border-b border-platinum/70 pb-6 gap-4">
                <div>
                  <h3 class="font-serif text-2xl text-luxury-black">Chronograph Elite</h3>
                  <p class="font-sans text-xs uppercase tracking-widest text-gray-500 mt-2">Ref: CH-EL-9921-A</p>
                </div>
                <div class="sm:text-right">
                  <div class="inline-flex items-center gap-1.5 text-champagne-dark px-3 py-1 bg-[#FFF8DC] border border-champagne rounded-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span class="font-sans text-[10px] font-bold tracking-widest uppercase">Verified Authentic</span>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-y-8 gap-x-4 mb-12 font-sans text-sm">
                <div>
                  <p class="text-gray-400 uppercase tracking-widest text-[10px] mb-1">Current Owner</p>
                  <p class="text-luxury-black font-medium">Valued Client</p>
                </div>
                <div>
                  <p class="text-gray-400 uppercase tracking-widest text-[10px] mb-1">Registration Date</p>
                  <p class="text-luxury-black font-medium">March 17, 2026</p>
                </div>
                <div>
                  <p class="text-gray-400 uppercase tracking-widest text-[10px] mb-1">Movement Calibre</p>
                  <p class="text-luxury-black font-medium">El Primero 3600 High-Frequency</p>
                </div>
                <div>
                  <p class="text-gray-400 uppercase tracking-widest text-[10px] mb-1">Case & Material</p>
                  <p class="text-luxury-black font-medium">18-carat Rose Gold</p>
                </div>
              </div>
              
              <div class="bg-zinc-100 border border-dotted border-gray-300 p-4 text-center">
                <p class="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">Blockchain Hash Signature</p>
                <p class="font-mono text-[11px] text-gray-600 break-all select-all">0x8f3c9b74d32a9f1c7d2e...a2b9f3c4d5e6f8a9b0c1</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-16 text-center">
          <a href="/profile" class="text-sm font-sans text-gray-500 hover:text-luxury-black transition-colors uppercase tracking-widest border-b border-transparent hover:border-luxury-black pb-1">Back to Dashboard</a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .perspective-1000 {
      perspective: 1000px;
    }
    .rotate-y-2 {
      transform: rotateY(2deg);
    }
  `]
})
export class AuthenticityViewer {
}
