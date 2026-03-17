import { Routes } from '@angular/router';
import { ProfileDashboard } from './profile-dashboard/profile-dashboard';
import { AuthenticityViewer } from './authenticity-viewer/authenticity-viewer';
import { authGuard } from '../../core/guards/auth/auth-guard';

export const profileRoutes: Routes = [
  { path: '', component: ProfileDashboard, canActivate: [authGuard] },
  { path: 'authenticity', component: AuthenticityViewer, canActivate: [authGuard] }
];
