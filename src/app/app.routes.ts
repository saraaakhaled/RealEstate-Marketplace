import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home')
        .then(m => m.Home)
  },

  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./features/properties/property-details/property-details')
        .then(m => m.PropertyDetails)
  },

  {
    path: 'properties',
    loadComponent: () =>
      import('./features/properties/properties')
        .then(m => m.Properties)
  },

  {
    path: 'add-property',
    loadComponent: () =>
      import('./features/properties/add-property/add-property')
        .then(m => m.AddProperty)
  },

  {
    path: 'customer/dashboard',
    loadComponent: () =>
      import('./features/customer/dashboard/dashboard')
        .then(m => m.Dashboard)
  },

  {
    path: 'customer/profile',
    loadComponent: () =>
      import('./features/customer/profile/profile')
        .then(m => m.Profile)
  },

  {
    path: 'customer/favorites',
    loadComponent: () =>
      import('./features/customer/favorites/favorites')
        .then(m => m.Favorites)
  },

  {
    path: 'customer/inquiries',
    loadComponent: () =>
      import('./features/customer/inquiries/inquiries')
        .then(m => m.Inquiries)
  },

  {
    path: 'agents',
    loadComponent: () =>
      import('./features/agents/agents')
        .then(m => m.Agents)
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about')
        .then(m => m.About)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.Register)
  }

];
