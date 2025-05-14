
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
   
  ]
})
export class RegisterModalComponent {

  user: User = new User('', '', '', '', 0);
  submitted = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9,10}$')
    ])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
  ) {}


  onSubmit() {
    this.submitted = true;
  
    if (this.registerForm.invalid) return;
  
    this.user.role = userRole.Employer;
    this.user.fullName = this.registerForm.value.name;
    this.user.email = this.registerForm.value.email;
    this.user.passwordHash = this.registerForm.value.password;
    this.user.phone = this.registerForm.value.phone;
  
    this.authenticationService.register(this.user).subscribe(res => {
      sessionStorage.setItem("token", res.token);
      this.authenticationService.isLoggedIn = true;
      this.route.navigate(['candidates']);
    });
  }
  
  closeModal(): void {
    this.route.navigate(['']);
  }
}
