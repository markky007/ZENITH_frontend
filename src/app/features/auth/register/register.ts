import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZInput } from '../../../shared/components/ui/z-input/z-input';
import { ZBtn } from '../../../shared/components/ui/z-btn/z-btn';
import { AuthStateService } from '../../../core/services/auth/auth-state';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ZInput, ZBtn],
  template: `
    <div class="min-h-screen flex bg-luxury-white">
      <!-- Form Section -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 order-2 lg:order-1">
        <div class="w-full max-w-md animate-fade-in-up">
          <div class="mb-10 text-center lg:text-left">
            <h2 class="text-3xl font-serif text-luxury-black mb-2">Join ZENITH</h2>
            <p class="text-gray-500 font-sans tracking-wide">Create an account to track your orders and access exclusive collections.</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <z-input label="First Name" [(value)]="firstName"></z-input>
              <z-input label="Last Name" [(value)]="lastName"></z-input>
            </div>
          
            <z-input 
              label="Email Address" 
              type="email" 
              [(value)]="email">
            </z-input>
            
            <z-input 
              label="Password" 
              type="password" 
              [(value)]="password">
            </z-input>
            
            <z-input 
              label="Confirm Password" 
              type="password" 
              [(value)]="confirmPassword">
            </z-input>
            
            <z-btn 
              variant="primary" 
              size="lg" 
              [block]="true" 
              [disabled]="isLoading()"
              type="submit">
              {{ isLoading() ? 'CREATING...' : 'CREATE ACCOUNT' }}
            </z-btn>
            
            <div *ngIf="errorMsg()" class="text-red-500 text-sm font-sans text-center mt-4 border border-red-200 bg-red-50 p-3 rounded">
              {{ errorMsg() }}
            </div>
          </form>
          
          <div class="mt-8 text-center text-sm text-gray-500 font-sans">
            Already have an account? 
            <a routerLink="/auth/login" class="text-luxury-black hover:text-champagne-dark font-medium transition-colors">Sign in</a>
          </div>
        </div>
      </div>
      
      <!-- Image Section -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-luxury-black items-center justify-center overflow-hidden order-1 lg:order-2">
        <div class="absolute inset-0 bg-gradient-to-bl from-black/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Watch Collection" 
          class="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div class="relative z-20 text-center text-luxury-white px-12">
          <h1 class="text-4xl font-serif mb-6 tracking-widest text-champagne">EXCLUSIVITY AWAITS</h1>
          <p class="text-lg font-sans font-light tracking-wide max-w-md mx-auto">Be the first to know about new releases, special offers, and limited editions.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `]
})
export class Register {
  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  
  isLoading = signal(false);
  errorMsg = signal('');
  
  private authState = inject(AuthStateService);
  private router = inject(Router);

  onSubmit() {
    if (!this.firstName() || !this.lastName() || !this.email() || !this.password()) {
      this.errorMsg.set('Please fill in all fields.');
      return;
    }
    
    if (this.password() !== this.confirmPassword()) {
      this.errorMsg.set('Passwords do not match.');
      return;
    }
    
    this.isLoading.set(true);
    this.errorMsg.set('');
    
    setTimeout(() => {
      this.isLoading.set(false);
      this.authState.setAuth({ id: '3', email: this.email(), role: 'User' }, 'fake-jwt-token-newuser');
      this.router.navigate(['/profile']);
    }, 1500);
  }
}
