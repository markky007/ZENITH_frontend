import { Injectable, signal, computed } from '@angular/core';

export interface UserSnippet {
  id: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly _currentUser = signal<UserSnippet | null>(null);
  private readonly _token = signal<string | null>(null);
  
  // Expose signals as computed properties
  readonly currentUser = computed(() => this._currentUser());
  readonly token = computed(() => this._token());
  readonly isAuthenticated = computed(() => this._token() !== null);
  readonly isManager = computed(() => this._currentUser()?.role === 'Manager' || this._currentUser()?.role === 'Admin');

  setAuth(user: UserSnippet, token: string) {
    this._token.set(token);
    this._currentUser.set(user);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  logout() {
    this._token.set(null);
    this._currentUser.set(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  loadFromStorage() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    if (token && user) {
      this._token.set(token);
      try {
        this._currentUser.set(JSON.parse(user));
      } catch {
        this.logout();
      }
    }
  }
}
