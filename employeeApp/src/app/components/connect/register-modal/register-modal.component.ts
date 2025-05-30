
import { Component } from '@angular/core';
import { User, userRole } from '../../../models/user';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationService } from '../../../services/authentication.service';
import { SwalService } from '../../../services/swal.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    MatProgressSpinner
  ]
})
export class RegisterModalComponent {
  user: User = new User('', '', '', '', 0);
  submitted = false;
  isLoading = false;
  
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9,10}$')
    ])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private swalService: SwalService
  ) {}

  onSubmit() {
    this.submitted = true;

    // Check if form is invalid and show validation error
    if (this.registerForm.invalid) {
      this.swalService.showFormValidationError();
      return;
    }

    this.isLoading = true;
    
    // Prepare user data
    this.user.role = userRole.Employer;
    this.user.fullName = this.registerForm.value.name;
    this.user.email = this.registerForm.value.email;
    this.user.passwordHash = this.registerForm.value.password;
    this.user.phone = this.registerForm.value.phone;

    this.authenticationService.register(this.user).subscribe({
      next: (res) => {
        this.isLoading = false;
        sessionStorage.setItem("token", res.token);
        this.authenticationService.isLoggedIn = true;
        
        this.swalService.showRegistrationSuccess().then(() => {
          this.route.navigate(['candidates']);
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        
        this.swalService.showRegistrationError(error);
      }
    });
  }

  closeModal(): void {
    if (this.hasFormData()) {
      this.swalService.showConfirmation(
        'Close Registration?',
        'Are you sure you want to close? Any entered data will be lost.',
        'Yes, Close',
        'Continue Editing'
      ).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate(['']);
        }
      });
    } else {
      this.route.navigate(['']);
    }
  }

  private hasFormData(): boolean {
    const formValues = this.registerForm.value;
    return Object.values(formValues).some(value => value && value.toString().trim() !== '');
  }

  private handleNetworkError() {
    this.swalService.showNetworkError().then((result) => {
      if (result.isConfirmed) {
        this.onSubmit();
      }
    });
  }
}