import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';

import { PropertyService } from '../../../core/services/property';
import { InquiryService } from '../../../core/services/inquiry';

@Component({
  selector: 'app-property-details',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    Navbar,
    Footer
  ],

  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails implements OnInit {

  property: any = null;

  selectedImage = '';

  propertyImages: string[] = [];

  isFavorite = false;

  isLoading = true;

  showInquiryForm = false;

  inquiryMessage = '';

  inquirySent = false;

  isSendingInquiry = false;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private inquiryService: InquiryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('DETAILS PAGE ID:', id);

    if (!id) {
      this.isLoading = false;
      return;
    }

    this.propertyService.getPropertyById(id).subscribe({

      next: (data) => {

        console.log('PROPERTY FROM API:', data);

        this.property = data;

        this.propertyImages = [];

        // Main image
        if (data.image) {
          this.propertyImages.push(
            'https://estatehub-backend-five.vercel.app/uploads/' + data.image
          );
        }

        // Additional images
        if (data.images && data.images.length > 0) {

          data.images.forEach((image: string) => {

            this.propertyImages.push(
              'https://estatehub-backend-five.vercel.app/uploads/' + image
            );

          });

        }

        // Select first image
        if (this.propertyImages.length > 0) {
          this.selectedImage = this.propertyImages[0];
        }

        this.isLoading = false;

        this.cdr.detectChanges();

        console.log('PROPERTY SET:', this.property);
        console.log('PROPERTY IMAGES:', this.propertyImages);

      },

      error: (error) => {

        console.error('PROPERTY API ERROR:', error);

        this.isLoading = false;

        this.cdr.detectChanges();

      }

    });
  }

  selectImage(image: string): void {

    this.selectedImage = image;

  }

  toggleFavorite(): void {

    if (!this.property) {
      return;
    }

    if (this.isFavorite) {

      this.propertyService.removeFromFavorites(
        this.property._id
      );

      this.isFavorite = false;

    } else {

      this.propertyService.addToFavorites(
        this.property
      );

      this.isFavorite = true;
    }
  }

  contactAgent(): void {

    this.showInquiryForm = true;

    this.inquirySent = false;

  }

  closeInquiry(): void {

    this.showInquiryForm = false;

    this.inquiryMessage = '';

  }

  sendInquiry(): void {

    if (
      !this.property ||
      !this.inquiryMessage.trim()
    ) {
      return;
    }

    this.isSendingInquiry = true;

    this.inquiryService.createInquiry(
      this.property._id,
      this.inquiryMessage.trim()
    ).subscribe({

      next: (response) => {

        console.log('Inquiry created:', response);

        this.isSendingInquiry = false;

        this.inquirySent = true;

        this.inquiryMessage = '';

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Inquiry error:', error);

        this.isSendingInquiry = false;

        this.cdr.detectChanges();

      }

    });
  }
}