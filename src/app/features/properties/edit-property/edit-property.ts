import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { PropertyService } from '../../../core/services/property';

@Component({
  selector: 'app-edit-property',
  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './edit-property.html',
  styleUrl: './edit-property.css'
})
export class EditProperty implements OnInit {

  propertyForm!: FormGroup;

  propertyId = '';

  loading = true;

  saving = false;

  errorMessage = '';

  successMessage = '';


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.propertyId =
      this.route.snapshot.paramMap.get('id') || '';

    this.propertyForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.required
      ],

      price: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      propertyType: [
        'Apartment',
        Validators.required
      ],

      listingType: [
        'Sale',
        Validators.required
      ],

      location: [
        '',
        Validators.required
      ],

      bedrooms: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      bathrooms: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      area: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]

    });

    this.loadProperty();
  }


  loadProperty(): void {

    this.loading = true;

    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe({

        next: (property) => {

          console.log(
            'Property loaded for edit:',
            property
          );

          this.propertyForm.patchValue({

            title: property.title,

            description:
              property.description,

            price:
              property.price,

            propertyType:
              property.propertyType,

            listingType:
              property.listingType,

            location:
              property.location,

            bedrooms:
              property.bedrooms,

            bathrooms:
              property.bathrooms,

            area:
              property.area

          });

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error loading property:',
            error
          );

          this.errorMessage =
            'Unable to load this property.';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }


  updateProperty(): void {

    if (
      this.propertyForm.invalid ||
      this.saving
    ) {

      this.propertyForm.markAllAsTouched();

      return;
    }

    this.saving = true;

    this.errorMessage = '';

    this.successMessage = '';


    const updatedProperty =
      this.propertyForm.value;


    console.log(
      'Updating property:',
      updatedProperty
    );


    this.propertyService
      .updateProperty(
        this.propertyId,
        updatedProperty
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Property updated:',
            response
          );

          this.successMessage =
            'Property updated successfully!';

          this.saving = false;

          this.cdr.detectChanges();


          setTimeout(() => {

            this.router.navigate([
              '/properties'
            ]);

          }, 1000);

        },

        error: (error) => {

          console.error(
            'Update property error:',
            error
          );

          this.saving = false;

          if (error.status === 403) {

            this.errorMessage =
              'You can only edit your own properties.';

          }

          else if (error.status === 401) {

            this.errorMessage =
              'Your session has expired. Please login again.';

          }

          else {

            this.errorMessage =
              'Failed to update property.';

          }

          this.cdr.detectChanges();
        }

      });
  }


  cancel(): void {

    this.router.navigate([
      '/properties'
    ]);

  }

}
