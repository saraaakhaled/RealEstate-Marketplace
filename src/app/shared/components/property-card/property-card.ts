import {
  Component,
  input,
  output
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './property-card.html',
  styleUrl: './property-card.css'
})
export class PropertyCard {

  property = input.required<any>();

  edit = output<string>();

  delete = output<string>();


  // =========================
  // Check if property belongs
  // to current Agent
  // =========================

  isOwner(): boolean {

    const token =
      localStorage.getItem('token');

    if (!token) {
      return false;
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

      return (
        this.property().createdBy ===
        currentUserId
      );

    } catch (error) {

      console.error(
        'Invalid token',
        error
      );

      return false;
    }
  }


  // =========================
  // Edit
  // =========================

  onEdit(): void {

    this.edit.emit(
      this.property()._id
    );
  }


  // =========================
  // Delete
  // =========================

  onDelete(): void {

    this.delete.emit(
      this.property()._id
    );
  }

}