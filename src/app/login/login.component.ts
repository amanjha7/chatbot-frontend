import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // initialize reactive form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // assuming username is email
      password: ['', Validators.required]
    });
  }

  /** Handle form submit */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;

        if(res.valid === false) {
          this.errorMessage = 'Invalid credentials. Please try again.';
          return;
        }

        // Save token in localStorage (optional)
        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        alert('Login successful ✅');
        this.router.navigate(['/chat']);
        // TODO: redirect to dashboard
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed. Try again.';
      }
    });
  }
}
