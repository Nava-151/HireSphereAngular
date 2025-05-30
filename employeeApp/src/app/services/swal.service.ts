
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  showSuccess(title: string, text: string, timer: number = 1500): Promise<any> {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      timer: timer,
      timerProgressBar: true,
      showConfirmButton: false,
      backdrop: `
        rgba(0,0,123,0.4)
        url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='4'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")
        left top
        repeat
      `,
      customClass: {
        popup: 'swal-success-popup',
        title: 'swal-success-title',
        htmlContainer: 'swal-success-text'
      }
    });
  }

  showError(title: string, text: string, confirmButtonText: string = 'Try Again'): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#00f5ff',
      backdrop: `
        rgba(123,0,0,0.4)
        url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3cpath d='M30 0c16.569 0 30 13.431 30 30s-13.431 30-30 30S0 46.569 0 30 13.431 0 30 0zm0 6C16.745 6 6 16.745 6 30s10.745 24 24 24 24-10.745 24-24S43.255 6 30 6z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")
        left top
        repeat
      `,
      customClass: {
        popup: 'swal-error-popup',
        title: 'swal-error-title',
        htmlContainer: 'swal-error-text',
        confirmButton: 'swal-error-button'
      },
      showClass: {
        popup: 'animate__animated animate__shakeX'
      }
    });
  }

  // Warning messages
  showWarning(title: string, text: string, confirmButtonText: string = 'OK'): Promise<any> {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#ff6b6b',
      customClass: {
        popup: 'swal-warning-popup',
        title: 'swal-warning-title',
        confirmButton: 'swal-warning-button'
      }
    });
  }

  // Conxfirmation dialogs
  showConfirmation(title: string, text: string, confirmText: string = 'Yes', cancelText: string = 'No'): Promise<any> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#ff6b6b',
      cancelButtonColor: '#00f5ff',
      customClass: {
        popup: 'swal-question-popup',
        title: 'swal-question-title',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    });
  }

  // Network error with retry option
  showNetworkError(): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: 'Connection Error',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Unable to connect to the server.</strong></p>
          <p>Please check:</p>
          <ul style="text-align: left; margin: 10px 0;">
            <li>Your internet connection</li>
            <li>Server status</li>
            <li>Firewall settings</li>
          </ul>
        </div>
      `,
      confirmButtonText: 'Retry',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#00f5ff',
      cancelButtonColor: '#6c757d',
      customClass: {
        popup: 'swal-network-error-popup',
        htmlContainer: 'swal-network-error-content'
      }
    });
  }

  // Registration specific errors
  showRegistrationError(error: any): Promise<any> {
    let errorMessage = 'An unexpected error occurred during registration. Please try again.';
    let errorTitle = 'Registration Failed';
    
    if (error.status === 409) {
      errorMessage = 'An account with this email already exists. Please use a different email or try logging in.';
      errorTitle = 'Email Already Exists';
    } else if (error.status === 400) {
      errorMessage = 'Invalid registration data. Please check your information and try again.';
      errorTitle = 'Invalid Data';
    } else if (error.status === 422) {
      errorMessage = 'The email format is invalid or the password is too weak.';
      errorTitle = 'Validation Error';
    } else if (error.status === 429) {
      errorMessage = 'Too many registration attempts. Please wait a moment and try again.';
      errorTitle = 'Too Many Attempts';
    } else if (error.status === 0 || error.status >= 500) {
      errorMessage = 'Server is currently unavailable. Please try again later.';
      errorTitle = 'Server Error';
    }

    return this.showError(errorTitle, errorMessage);
  }

  // Login specific errors
  showLoginError(error: any): Promise<any> {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    let errorTitle = 'Login Failed';
    
    if (error.status === 401) {
      errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      errorTitle = 'Authentication Failed';
    } else if (error.status === 403) {
      errorMessage = 'Your account has been suspended. Please contact support.';
      errorTitle = 'Account Suspended';
    } else if (error.status === 404) {
      errorMessage = 'Account not found. Please check your email address or sign up.';
      errorTitle = 'Account Not Found';
    } else if (error.status === 429) {
      errorMessage = 'Too many login attempts. Please wait a moment and try again.';
      errorTitle = 'Too Many Attempts';
    } else if (error.status === 0 || error.status >= 500) {
      errorMessage = 'Server is currently unavailable. Please try again later.';
      errorTitle = 'Server Error';
    }

    return this.showError(errorTitle, errorMessage);
  }

  // Form validation warning
  showFormValidationError(): Promise<any> {
    return this.showWarning(
      'Invalid Form', 
      'Please fill in all required fields correctly.'
    );
  }

  // Registration success
  showRegistrationSuccess(): Promise<any> {
    return this.showSuccess(
      'Welcome!', 
      'Registration successful. Redirecting to your dashboard...',
      2000
    );
  }

  // Login success
  showLoginSuccess(): Promise<any> {
    return this.showSuccess(
      'Welcome Back!', 
      'Login successful. Redirecting...',
      1500
    );
  }
}