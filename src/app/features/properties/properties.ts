import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PropertyCard } from '../../shared/components/property-card/property-card';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

import { PropertyService } from '../../core/services/property';


@Component({
  selector: 'app-properties',
  standalone: true,

  imports: [
    FormsModule,
    PropertyCard,
    Navbar,
    Footer
  ],

  templateUrl: './properties.html',
  styleUrl: './properties.css'
})
export class Properties implements OnInit {

  properties: any[] = [];

  filteredProperties: any[] = [];

  searchText = '';

  selectedType = 'All Types';

  selectedLocation = 'All Locations';

  selectedPrice = 'Any Price';


  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================
  // Init
  // =========================

  ngOnInit(): void {

    const params =
      this.route.snapshot.queryParams;


    this.searchText =
      params['search'] || '';


    this.selectedType =
      params['type'] || 'All Types';


    this.selectedLocation =
      params['location'] || 'All Locations';


    this.selectedPrice =
      params['price'] || 'Any Price';


    this.loadProperties();
  }


  // =========================
  // Load Properties
  // =========================

  loadProperties(): void {

    this.propertyService
      .getProperties()
      .subscribe({

        next: (data) => {

          this.properties =
            data || [];


          console.log(
            'Properties loaded:',
            this.properties
          );


          console.log(
            'Number of properties:',
            this.properties.length
          );


          this.applyFilters();

          this.cdr.detectChanges();
        },


        error: (error) => {

          console.error(
            'Error loading properties:',
            error
          );


          this.properties = [];

          this.filteredProperties = [];

          this.cdr.detectChanges();
        }

      });
  }


  // =========================
  // Filters
  // =========================

  applyFilters(): void {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    this.filteredProperties =
      this.properties.filter(
        (property) => {

          const title =
            property.title
              ? String(property.title)
                  .toLowerCase()
              : '';


          const location =
            property.location
              ? String(property.location)
                  .toLowerCase()
              : '';


          const propertyType =
            property.propertyType
              ? String(property.propertyType)
                  .toLowerCase()
              : '';


          const price =
            Number(property.price) || 0;


          const matchesSearch =
            search === '' ||
            title.includes(search) ||
            location.includes(search);


          const matchesType =
            this.selectedType ===
              'All Types' ||
            propertyType ===
              this.selectedType.toLowerCase();


          const matchesLocation =
            this.selectedLocation ===
              'All Locations' ||
            location ===
              this.selectedLocation
                .toLowerCase();


          let matchesPrice = true;


          if (
            this.selectedPrice ===
            'Under $100k'
          ) {

            matchesPrice =
              price < 100000;

          }


          else if (
            this.selectedPrice ===
            '$100k - $300k'
          ) {

            matchesPrice =
              price >= 100000 &&
              price <= 300000;

          }


          else if (
            this.selectedPrice ===
            '$300k - $500k'
          ) {

            matchesPrice =
              price > 300000 &&
              price <= 500000;

          }


          else if (
            this.selectedPrice ===
            '$500k+'
          ) {

            matchesPrice =
              price > 500000;

          }


          return (
            matchesSearch &&
            matchesType &&
            matchesLocation &&
            matchesPrice
          );

        }
      );


    this.cdr.detectChanges();
  }


  // =========================
  // Clear Filters
  // =========================

  clearFilters(): void {

    this.searchText = '';

    this.selectedType =
      'All Types';

    this.selectedLocation =
      'All Locations';

    this.selectedPrice =
      'Any Price';


    this.filteredProperties = [
      ...this.properties
    ];


    this.cdr.detectChanges();
  }


  // =========================
  // Edit Property
  // =========================

  editProperty(id: string): void {

    console.log(
      'Editing property:',
      id
    );


    this.router.navigate([
      '/edit-property',
      id
    ]);
  }


  // =========================
  // Delete Property
  // =========================

  deleteProperty(id: string): void {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this property?'
      );


    if (!confirmed) {
      return;
    }


    console.log(
      'Deleting property:',
      id
    );


    this.propertyService
      .deleteProperty(id)
      .subscribe({

        next: (response) => {

          console.log(
            'Property deleted:',
            response
          );


          // Remove property from local arrays

          this.properties =
            this.properties.filter(
              (property) =>
                property._id !== id
            );


          this.filteredProperties =
            this.filteredProperties.filter(
              (property) =>
                property._id !== id
            );


          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            'Delete property error:',
            error
          );


          if (
            error.status === 403
          ) {

            alert(
              'You can only delete your own properties.'
            );

          }

          else if (
            error.status === 401
          ) {

            alert(
              'Your session has expired. Please login again.'
            );

          }

          else {

            alert(
              'Failed to delete property.'
            );

          }

        }

      });

  }

}