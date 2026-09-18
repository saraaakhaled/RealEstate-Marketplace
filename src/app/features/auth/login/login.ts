import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login() {

    this.errorMessage = '';
    this.isLoading = true;

    this.auth.login(this.email, this.password).subscribe({

      next: (response) => {

        console.log('Login response:', response);

        this.auth.saveToken(response.token);

        this.isLoading = false;

        const role = response.user?.role;

        console.log('User role:', role);

        if (role === 'Agent') {

          this.router.navigate(['/agent/dashboard']);

        } else {

          this.router.navigate(['/customer/dashboard']);

        }

      },

      error: (error) => {

        console.error('LOGIN ERROR:', error);

        this.isLoading = false;

        this.errorMessage =
          error.error?.message ||
          'Invalid email or password';
      }

    });
  }
}