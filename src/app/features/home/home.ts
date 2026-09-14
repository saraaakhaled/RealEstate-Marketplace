import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { PropertyCard } from '../../shared/components/property-card/property-card';
import { PropertyService } from '../../core/services/property';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    Navbar,
    Footer,
    PropertyCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  searchType = 'Buy';

  searchLocation = '';
  selectedType = 'Any Type';
  selectedPrice = 'Any Price';

  featuredProperties: any[] = [];

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProperties();
  }

  loadFeaturedProperties(): void {

    this.propertyService.getProperties().subscribe({

      next: (data) => {

        this.featuredProperties = (data || []).slice(0, 3);

        console.log(
          'Featured properties:',
          this.featuredProperties
        );

      },

      error: (error) => {

        console.error(
          'Error loading featured properties:',
          error
        );

      }

    });
  }

  setSearchType(type: string): void {

    this.searchType = type;

  }

  search(): void {

    const queryParams: any = {};

    // Search by location
    if (this.searchLocation.trim() !== '') {

      queryParams.search =
        this.searchLocation.trim();

    }

    // Property type
    if (this.selectedType !== 'Any Type') {

      queryParams.type =
        this.selectedType;

    }

    // Price range
    if (this.selectedPrice !== 'Any Price') {

      queryParams.price =
        this.selectedPrice;

    }

    console.log('Search:', {
      searchType: this.searchType,
      location: this.searchLocation,
      propertyType: this.selectedType,
      price: this.selectedPrice
    });

    // Open Properties page with the selected filters
    this.router.navigate(
      ['/properties'],
      {
        queryParams: queryParams
      }
    );

  }

}
