import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZInput } from '../../../shared/components/ui/z-input/z-input';
import { ZBtn } from '../../../shared/components/ui/z-btn/z-btn';
import { AuthStateService } from '../../../core/services/auth/auth-state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ZInput, ZBtn],
  template: `
    <div class="min-h-screen flex bg-luxury-white">
      <!-- Image Section -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-luxury-black items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Watch" 
          class="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div class="relative z-20 text-center text-luxury-white px-12">
          <h1 class="text-5xl font-serif mb-6 tracking-widest text-champagne">ZENITH</h1>
          <p class="text-xl font-sans font-light tracking-wide max-w-md mx-auto">Master the art of time. Discover our exclusive collections reserved for members.</p>
        </div>
      </div>
      
      <!-- Form Section -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <div class="w-full max-w-md animate-fade-in-up">
          <div class="mb-10 text-center lg:text-left">
            <h2 class="text-3xl font-serif text-luxury-black mb-2">Welcome Back</h2>
            <p class="text-gray-500 font-sans tracking-wide">Enter your credentials to access your account.</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" class="space-y-6">
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
            
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox h-4 w-4 text-luxury-black border-gray-300 rounded focus:ring-luxury-black">
                <span class="ml-2 text-gray-600 font-sans">Remember me</span>
              </label>
              <a href="#" class="text-luxury-black hover:text-champagne-dark transition-colors font-medium">Forgot password?</a>
            </div>
            
            <z-btn 
              variant="primary" 
              size="lg" 
              [block]="true" 
              [disabled]="isLoading()"
              type="submit">
              {{ isLoading() ? 'AUTHENTICATING...' : 'SIGN IN' }}
            </z-btn>
            
            <div *ngIf="errorMsg()" class="text-red-500 text-sm font-sans text-center mt-4 border border-red-200 bg-red-50 p-3 rounded">
              {{ errorMsg() }}
            </div>
          </form>
          
          <div class="mt-8 text-center text-sm text-gray-500 font-sans">
            Don't have an account? 
            <a routerLink="/auth/register" class="text-luxury-black hover:text-champagne-dark font-medium transition-colors">Create one</a>
          </div>
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
export class Login {
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMsg = signal('');
  
  private authState = inject(AuthStateService);
  private router = inject(Router);

  onSubmit() {
    if (!this.email() || !this.password()) {
      this.errorMsg.set('Please fill in all fields.');
      return;
    }
    
    this.isLoading.set(true);
    this.errorMsg.set('');
    
    // Simulate Backend API call for now
    setTimeout(() => {
      this.isLoading.set(false);
      if (this.email() === 'admin@zenith.com' && this.password() === 'admin') {
        this.authState.setAuth({ id: '1', email: this.email(), role: 'Admin' }, 'fake-jwt-token-admin');
        this.router.navigate(['/admin']);
      } else if (this.email() === 'user@zenith.com' && this.password() === 'user') {
        this.authState.setAuth({ id: '2', email: this.email(), role: 'User' }, 'fake-jwt-token-user');
        this.router.navigate(['/profile']);
      } else {
        this.errorMsg.set('Invalid email or password. Use user@zenith.com/user or admin@zenith.com/admin');
      }
    }, 1500);
  }
}
