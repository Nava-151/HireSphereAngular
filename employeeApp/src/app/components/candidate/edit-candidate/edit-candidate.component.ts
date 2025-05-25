import { Component } from '@angular/core';
import { UserUpdateDetails } from '../../../models/UserUpdateDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-candidate',
  imports: [ ReactiveFormsModule],
  templateUrl: './edit-candidate.component.html',
  styleUrl: './edit-candidate.component.css'
})
export class EditCandidateComponent {

  userForm: FormGroup;
  userId: number = +(sessionStorage.getItem('id')||"0"); 

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      // passwordHash: [null],  
    });
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(user => this.userForm.patchValue(user));
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: UserUpdateDetails = this.userForm.value;


      this.userService.updateUser(this.userId, userData).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          alert('User updated successfully');
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
