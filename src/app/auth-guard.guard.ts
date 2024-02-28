import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuardGuard: CanActivateFn = (next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
  const router = inject(Router)
  const authService = inject(AuthService)
  return authService.isAuthenticatedUser().pipe(
    map((isAuthenticated: boolean) => {
      if (isAuthenticated && localStorage.getItem('authToken')) {
          return true;
        } 
          // router.createUrlTree(['/login']);
          return false;
      })
    );
  }

