import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // =========================
  // HOME
  // =========================

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


  // =========================
  // PROPERTIES
  // =========================

  {
    path: 'properties',
    loadComponent: () =>
      import('./features/properties/properties')
        .then(m => m.Properties)
  },

  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./features/properties/property-details/property-details')
        .then(m => m.PropertyDetails)
  },

  {
    path: 'add-property',
    loadComponent: () =>
      import('./features/properties/add-property/add-property')
        .then(m => m.AddProperty),

    canActivate: [authGuard]
  },

  {
    path: 'edit-property/:id',
    loadComponent: () =>
      import('./features/properties/edit-property/edit-property')
        .then(m => m.EditProperty),

    canActivate: [authGuard]
  },


  // =========================
  // CUSTOMER
  // =========================

  {
    path: 'customer/dashboard',
    loadComponent: () =>
      import('./features/customer/dashboard/dashboard')
        .then(m => m.Dashboard),

    canActivate: [authGuard]
  },

  {
    path: 'customer/profile',
    loadComponent: () =>
      import('./features/customer/profile/profile')
        .then(m => m.Profile),

    canActivate: [authGuard]
  },

  {
    path: 'customer/favorites',
    loadComponent: () =>
      import('./features/customer/favorites/favorites')
        .then(m => m.Favorites),

    canActivate: [authGuard]
  },

  {
    path: 'customer/inquiries',
    loadComponent: () =>
      import('./features/customer/inquiries/inquiries')
        .then(m => m.Inquiries),

    canActivate: [authGuard]
  },


  // =========================
  // AGENT
  // =========================

  {
    path: 'agent/dashboard',
    loadComponent: () =>
      import('./features/agent/dashboard/dashboard')
        .then(m => m.Dashboard),

    canActivate: [authGuard]
  },


  // =========================
  // AGENTS
  // =========================

  {
    path: 'agents',
    loadComponent: () =>
      import('./features/agents/agents')
        .then(m => m.Agents)
  },


  // =========================
  // ABOUT
  // =========================

  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about')
        .then(m => m.About)
  },


  // =========================
  // AUTH
  // =========================

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
