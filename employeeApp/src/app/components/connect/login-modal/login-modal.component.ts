

import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { _MatInternalFormField } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../services/authentication.service';
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
    RouterModule
  ],
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
private dailog=inject(MatDialog)
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  credentials = { email: '', passwordHash: '' };
  router = inject(Router);
  // dialogRef: any;
  constructor(private auhenticationService: AuthenticationService) { }
  onSubmit() {
    this.loginForm.value?.email ? this.credentials.email = this.loginForm.value.email : "";
    this.loginForm.value?.password ? this.credentials.passwordHash = this.loginForm.value.password : "";
    this.auhenticationService.login(this.credentials).subscribe(res => {
      console.log(res)
      localStorage.setItem("id", res.userId);
      localStorage.setItem("token", res.token);
      this.auhenticationService.isLoggedIn = true;

      this.router.navigate(['candidates']);
    }, error => {
      console.log(error);
    }
    );
  }

  closeModal(): void {
    // this.dailog.close();
  }
}


