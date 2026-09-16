import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;

  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {

    this.registerForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: ['', Validators.required],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      confirmPassword: ['', Validators.required]

    });

  }

  register() {

    this.errorMessage = '';

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    const formValue = this.registerForm.value;

    if (formValue.password !== formValue.confirmPassword) {

      this.errorMessage = 'Passwords do not match';

      return;
    }

    this.isLoading = true;

    this.auth.signup({

      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      role: 'Buyer',
      phone: formValue.phone

    }).subscribe({

      next: (response) => {

        this.auth.saveToken(response.token);

        this.isLoading = false;

        this.router.navigate(['/customer/dashboard']);

      },

      error: (error) => {

        this.isLoading = false;

        this.errorMessage =
          error.error?.message || 'Registration failed';

      }

    });

  }

}
