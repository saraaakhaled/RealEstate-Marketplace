import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.css'
})
export class DashboardSidebar {

  menuItems = [

    {
      label: 'Home',
      icon: '⌂',
      route: '/home'
    },

    {
      label: 'Properties',
      icon: '▣',
      route: '/properties'
    },

    {
      label: 'Dashboard',
      icon: '⌂',
      route: '/customer/dashboard'
    },

    {
      label: 'Profile',
      icon: '◉',
      route: '/customer/profile'
    },

    {
      label: 'Favorite Properties',
      icon: '♡',
      route: '/customer/favorites'
    },

    {
      label: 'My Inquiries',
      icon: '✉',
      route: '/customer/inquiries'
    }

  ];

  constructor(
    private router: Router
  ) {}

  logout(): void {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }

}