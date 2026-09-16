import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  ChangeDetectorRef,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { DashboardSidebar } from '../../../shared/components/dashboard-sidebar/dashboard-sidebar';
import { PropertyCard } from '../../../shared/components/property-card/property-card';

import { PropertyService } from '../../../core/services/property';
import { InquiryService } from '../../../core/services/inquiry';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DashboardSidebar,
    PropertyCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  userName = signal('User');

  stats = [
    {
      label: 'Favorite Properties',
      value: 0,
      icon: '♡'
    },
    {
      label: 'Active Inquiries',
      value: 0,
      icon: '✉'
    },
    {
      label: 'Recently Viewed',
      value: 0,
      icon: '◷'
    }
  ];

  recentlyViewed: any[] = [];

  inquiries: any[] = [];

  constructor(
    private propertyService: PropertyService,
    private inquiryService: InquiryService,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadProfile();

    this.loadDashboardData();

    this.loadInquiries();
  }


  loadProfile(): void {

    this.auth.getProfile().subscribe({

      next: (user) => {

        console.log(
          'Dashboard user:',
          user
        );

        this.userName.set(
          user.name || 'User'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Dashboard profile error:',
          error
        );

      }

    });
  }


  loadDashboardData(): void {

    this.recentlyViewed =
      this.propertyService.getFavorites();


    this.stats[0].value =
      this.propertyService
        .getFavorites()
        .length;


    this.stats[2].value =
      this.recentlyViewed.length;


    this.cdr.detectChanges();


    if (this.recentlyViewed.length === 0) {

      this.propertyService
        .getProperties()
        .subscribe({

          next: (data) => {

            this.recentlyViewed =
              data.slice(0, 3);


            this.stats[2].value =
              this.recentlyViewed.length;


            console.log(
              'Dashboard properties:',
              this.recentlyViewed
            );


            this.cdr.detectChanges();
          },

          error: (error) => {

            console.error(
              'Dashboard properties error:',
              error
            );

          }

        });
    }
  }


  loadInquiries(): void {

    this.inquiryService
      .getMyInquiries()
      .subscribe({

        next: (data) => {

          this.inquiries = data;


          this.stats[1].value =
            data.length;


          console.log(
            'Dashboard Inquiries:',
            data
          );


          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Dashboard inquiries error:',
            error
          );

        }

      });
  }

}
