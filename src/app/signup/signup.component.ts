import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // using email
      username: ['', [Validators.required, Validators.minLength(3)]], // using username
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  /** Custom validator to match password & confirm password */
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  /** Handle form submit */
  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill the form correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { username, password, email } = this.signupForm.value;

    this.authService.register(username, email, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'Registration successful ✅ You can now log in.';
        this.signupForm.reset();
        this.router.navigate(['/chat']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Signup failed. Try again.';
      }
    });
  }
}
