import { Routes } from '@angular/router';
import { authGuardGuard } from './auth-guard.guard';
import { loginGuard } from './login.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: ()=> import('./home/home.component').then(c => c.HomeComponent) },
  { path: 'contacts', canActivate: [authGuardGuard], loadComponent: ()=> import('./contacts/contacts.component').then(c => c.ContactsComponent)},
  { path: 'login', canActivate: [loginGuard], loadComponent: ()=> import('./login/login.component').then(c => c.LoginComponent)},
  { path: 'register', canActivate: [loginGuard], loadComponent: ()=> import('./register/register.component').then(c => c.RegisterComponent)}
];
