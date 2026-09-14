import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-agents',
  standalone: true,

  imports: [
    CommonModule,
    Navbar,
    Footer
  ],

  templateUrl: './agents.html',
  styleUrl: './agents.css'
})
export class Agents implements OnInit {

  agents: any[] = [];

  isLoading = true;

  constructor(
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadAgents();

  }

  loadAgents(): void {

    this.isLoading = true;

    this.cdr.detectChanges();

    this.auth.getAgents().subscribe({

      next: (data) => {

        console.log(
          'Agents:',
          data
        );

        this.agents = data;

        this.isLoading = false;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(
          'Error loading agents:',
          error
        );

        this.agents = [];

        this.isLoading = false;

        this.cdr.detectChanges();

      }

    });

  }

}