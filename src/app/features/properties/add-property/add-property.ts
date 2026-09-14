import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';

import { PropertyService } from '../../../core/services/property';

@Component({
  selector: 'app-add-property',

  standalone: true,

  imports: [
    FormsModule,
    RouterLink,
    Navbar,
    Footer
  ],

  templateUrl: './add-property.html',

  styleUrl: './add-property.css'
})
export class AddProperty {

  property = {

    title: '',

    description: '',

    price: '',

    propertyType: 'Apartment',

    listingType: 'Sale',

    location: '',

    bedrooms: 1,

    bathrooms: 1,

    area: ''

  };


  selectedImages: File[] = [];

  isSubmitting = false;


  constructor(

    private propertyService: PropertyService,

    private router: Router

  ) {}


  // =========================
  // Select Images
  // =========================

  onImagesSelected(event: any): void {

    const files = event.target.files;

    if (!files) {

      return;

    }


    this.selectedImages =
      Array.from(files);


    console.log(
      'Selected images:',
      this.selectedImages
    );

  }


  // =========================
  // Submit Property
  // =========================

  submitProperty(): void {

    if (this.isSubmitting) {

      return;

    }


    console.log(
      'Property data:',
      this.property
    );

    console.log(
      'Images:',
      this.selectedImages
    );


    this.isSubmitting = true;


    this.propertyService
      .createProperty(
        this.property,
        this.selectedImages
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Property created successfully:',
            response
          );


          this.isSubmitting = false;


          alert(
            'Property added successfully!'
          );


          this.router.navigate([
            '/properties'
          ]);

        },


        error: (error) => {

          console.error(
            'Create property error:',
            error
          );


          this.isSubmitting = false;


          if (
            error.status === 401
          ) {

            alert(
              'You need to login first.'
            );

          }

          else if (
            error.status === 403
          ) {

            alert(
              'Only Admin or Agent can add properties.'
            );

          }

          else {

            alert(
              error.error?.message ||
              'Something went wrong while adding the property.'
            );

          }

        }

      });

  }

}
