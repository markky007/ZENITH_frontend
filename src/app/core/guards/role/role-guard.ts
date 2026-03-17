import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../../services/auth/auth-state';

export const roleGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;
  const user = authState.currentUser();

  if (authState.isAuthenticated() && user && (user.role === requiredRole || user.role === 'Admin')) {
    return true;
  }
  
  return router.createUrlTree(['/']);
};
