import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invite-for-interview',
  imports: [MatFormField,MatLabel, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './invite-for-interview.component.html',
  styleUrl: './invite-for-interview.component.css'
})
export class InviteForInterviewComponent {

  date!: Date | null;
  time!: string;

  constructor(public dialogRef: MatDialogRef<InviteForInterviewComponent>) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    if (this.date && this.time) {
      this.dialogRef.close({ date: this.date, time: this.time });
    }
  }
}
