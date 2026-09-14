import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardSidebar } from '../../../shared/components/dashboard-sidebar/dashboard-sidebar';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DashboardSidebar
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  private fb = inject(FormBuilder);
  private auth = inject(Auth);

  isEditing = false;
  savedMessage = '';

  profileForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]]
  });

  passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {

    this.auth.getProfile().subscribe({

      next: (user) => {

        console.log('Profile:', user);

        this.profileForm.patchValue({
          fullName: user.name,
          email: user.email,
          phone: user.phone
        });

      },

      error: (error) => {

        console.error('Profile error:', error);

      }

    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.savedMessage = '';
  }

  saveProfile(): void {

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isEditing = false;
    this.savedMessage = 'Profile updated successfully.';
  }

  changePassword(): void {

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { newPassword, confirmPassword } =
      this.passwordForm.getRawValue();

    if (newPassword !== confirmPassword) {
      this.savedMessage = 'Passwords do not match.';
      return;
    }

    this.passwordForm.reset();

    this.savedMessage = 'Password changed successfully.';
  }

}