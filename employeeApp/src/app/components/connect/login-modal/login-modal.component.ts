import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, NgModel, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { _MatInternalFormField } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../services/authentication.service';
import { SwalService } from '../../../services/swal.service';
import {  userRole } from '../../../models/user';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  imports: [
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatProgressSpinner
  ],
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  hidePassword = true;
  isLoading = false;
  submitted = false;
  private dialog = inject(MatDialog);
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  
  credentials = { email: '', passwordHash: '', role: userRole.Employer };
  router = inject(Router);

  constructor(
    private authenticationService: AuthenticationService,
    private swalService: SwalService
  ) { }

  onSubmit() {
    this.submitted = true;

    // Check if form is invalid and show validation error
    if (this.loginForm.invalid) {
      this.swalService.showFormValidationError();
      return;
    }

    
    this.credentials.email = this.loginForm.value?.email || '';
    this.credentials.passwordHash = this.loginForm.value?.password || '';
    this.isLoading=true;
    // Call authentication service
    this.authenticationService.login(this.credentials).subscribe({
      next: (res) => {
        this.isLoading = false;
        
        sessionStorage.setItem("token", res.token);
        this.authenticationService.isLoggedIn = true;
        
        // Show success message and navigate after it completes
        this.swalService.showLoginSuccess().then(() => {
          this.router.navigate(['candidates']);
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        
        if (error.status === 0 || !error.status) {
          this.handleNetworkError();
        } else {
          this.swalService.showLoginError(error);
        }
      }
    });
  }

  closeModal(): void {
    // Show confirmation dialog before closing if form has data
    if (this.hasFormData()) {
      this.swalService.showConfirmation(
        'Close Login?',
        'Are you sure you want to close? Any entered data will be lost.',
        'Yes, Close',
        'Continue'
      ).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['']);
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Method to handle network errors specifically
  private handleNetworkError(): void {
    this.swalService.showNetworkError().then((result) => {
      if (result.isConfirmed) {
        this.onSubmit();
      }
    });
  }

  private hasFormData(): boolean {
    const formValues = this.loginForm.value;
    return Object.values(formValues).some(value => value && value.toString().trim() !== '');
  }

  // Method to handle forgot password will be later
  onForgotPassword(): void {
    this.swalService.showWarning(
      'Forgot Password',
      'Password reset functionality will be available soon. Please contact support if needed.',
      'OK'
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}