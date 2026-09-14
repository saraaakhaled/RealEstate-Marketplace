import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { DashboardSidebar } from '../../../shared/components/dashboard-sidebar/dashboard-sidebar';
import { InquiryService } from '../../../core/services/inquiry';

@Component({
  selector: 'app-inquiries',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    DashboardSidebar
  ],

  templateUrl: './inquiries.html',
  styleUrl: './inquiries.css'
})
export class Inquiries implements OnInit {

  inquiries: any[] = [];

  isLoading = false;

  constructor(
    private inquiryService: InquiryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadInquiries();

  }

  loadInquiries(): void {

    this.isLoading = true;

    this.cdr.detectChanges();

    this.inquiryService
      .getMyInquiries()
      .subscribe({

        next: (data: any[]) => {

          console.log(
            'My Inquiries:',
            data
          );

          console.log(
            'Number of inquiries:',
            data.length
          );

          this.inquiries = data;

          this.isLoading = false;

          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.error(
            'Error loading inquiries:',
            error
          );

          this.inquiries = [];

          this.isLoading = false;

          this.cdr.detectChanges();

        }

      });

  }

}