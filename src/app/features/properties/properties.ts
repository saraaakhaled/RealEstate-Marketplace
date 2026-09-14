import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private cdr: ChangeDetectorRef
  ) {}


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


          console.log(
            'Filtered properties:',
            this.filteredProperties
          );


          /*
           * Tell Angular to update
           * the page immediately.
           */
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


          /*
           * Search
           */
          const matchesSearch =
            search === '' ||
            title.includes(search) ||
            location.includes(search);


          /*
           * Property Type
           */
          const matchesType =
            this.selectedType === 'All Types' ||
            propertyType ===
              this.selectedType.toLowerCase();


          /*
           * Location
           */
          const matchesLocation =
            this.selectedLocation ===
              'All Locations' ||
            location ===
              this.selectedLocation
                .toLowerCase();


          /*
           * Price
           */
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


    console.log(
      'Filtered properties:',
      this.filteredProperties
    );


    /*
     * Update the screen when filters
     * change.
     */
    this.cdr.detectChanges();
  }


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

}
