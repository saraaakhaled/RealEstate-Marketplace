import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
selector: 'app-register',
standalone: true,
imports: [
RouterLink,
FormsModule
],
templateUrl: './register.html',
styleUrl: './register.css'
})
export class Register {

name = '';
email = '';
phone = '';
password = '';
confirmPassword = '';

errorMessage = '';
isLoading = false;

constructor(
private auth: Auth,
private router: Router
) {}

register() {

this.errorMessage = '';

if (this.password !== this.confirmPassword) {
  this.errorMessage = 'Passwords do not match';
  return;
}

this.isLoading = true;

this.auth.signup({
  name: this.name,
  email: this.email,
  password: this.password,
  role: 'Buyer',
  phone: this.phone
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
