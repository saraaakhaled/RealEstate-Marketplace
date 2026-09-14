import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardSidebar } from '../../../shared/components/dashboard-sidebar/dashboard-sidebar';
import { PropertyService } from '../../../core/services/property';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DashboardSidebar
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {

  favoriteProperties: any[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteProperties = this.propertyService.getFavorites();

    console.log('Favorite Properties:', this.favoriteProperties);
  }

  removeFavorite(id: string): void {
    this.propertyService.removeFromFavorites(id);

    this.loadFavorites();
  }
}