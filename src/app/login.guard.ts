import { CanActivateFn } from '@angular/router';
import { authGuardGuard } from './auth-guard.guard';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
// import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state): Observable<boolean> | Promise<boolean> | boolean => {
  return inject(AuthService).isAuthenticated ? false : true
};
