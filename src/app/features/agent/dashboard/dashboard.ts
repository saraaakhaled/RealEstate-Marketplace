import {
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { Auth } from '../../../core/services/auth';
import { PropertyService } from '../../../core/services/property';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  agentName = 'Agent';
  agentEmail = '';
  agentPhone = '';

  properties: any[] = [];

  totalProperties = 0;

  saleProperties = 0;

  rentProperties = 0;


  constructor(
    private auth: Auth,
    private propertyService: PropertyService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadAgentProfile();

    this.loadAgentProperties();
  }


  loadAgentProfile(): void {

    this.auth.getProfile().subscribe({

      next: (user) => {

        console.log(
          'Agent Profile:',
          user
        );

        this.agentName =
          user.name || 'Agent';

        this.agentEmail =
          user.email || '';

        this.agentPhone =
          user.phone || '';

      },

      error: (error) => {

        console.error(
          'Error loading agent profile:',
          error
        );

      }

    });

  }


  loadAgentProperties(): void {

    this.propertyService
      .getProperties()
      .subscribe({

        next: (data) => {

          const token =
            localStorage.getItem('token');

          if (!token) {
            return;
          }

          try {

            const payload =
              JSON.parse(
                atob(
                  token.split('.')[1]
                )
              );

            const currentUserId =
              payload.userId;

            this.properties =
              (data || []).filter(
                (property: any) => {

                  const ownerId =
                    typeof property.createdBy === 'object'
                      ? property.createdBy?._id
                      : property.createdBy;

                  return (
                    String(ownerId) ===
                    String(currentUserId)
                  );

                }
              );


            this.totalProperties =
              this.properties.length;


            this.saleProperties =
              this.properties.filter(
                (property: any) =>
                  property.listingType === 'Sale'
              ).length;


            this.rentProperties =
              this.properties.filter(
                (property: any) =>
                  property.listingType === 'Rent'
              ).length;


            console.log(
              'Agent Properties:',
              this.properties
            );

            console.log(
              'Total:',
              this.totalProperties
            );

            console.log(
              'For Sale:',
              this.saleProperties
            );

            console.log(
              'For Rent:',
              this.rentProperties
            );

          } catch (error) {

            console.error(
              'Invalid token:',
              error
            );

          }

        },

        error: (error) => {

          console.error(
            'Error loading agent properties:',
            error
          );

        }

      });

  }


  addProperty(): void {

    this.router.navigate([
      '/add-property'
    ]);

  }


  viewProperties(): void {

    this.router.navigate([
      '/properties'
    ]);

  }


  logout(): void {

    this.auth.logout();

    this.router.navigate([
      '/login'
    ]);

  }

}
