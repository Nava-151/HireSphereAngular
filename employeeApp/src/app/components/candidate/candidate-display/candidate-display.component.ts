
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { UserResumeDetails } from '../../../models/UserResumeDetails';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// ייבוא EmailJS
import emailjs from '@emailjs/browser';
import { InviteForInterviewComponent } from '../invite-for-interview/invite-for-interview.component';

@Component({
  selector: 'app-candidate-display',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './candidate-display.component.html',
  styleUrls: ['./candidate-display.component.css']
})
export class CandidateDisplayComponent {
  @Input() userDetails!: UserResumeDetails;

  private router = inject(Router);
  private userResumeService = inject(ResumeDetailsService);
  private dialog = inject(MatDialog);

  watch(id: number) {
    this.userResumeService.viewFile(id).subscribe(response => {
      if (response) {
        window.open(response, '_blank');
      }
      else{
        console.log(response);
      }
    });
  }

  download(fileKey: string) {
    this.userResumeService.downloadFile(fileKey).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileKey;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  inviteToInterview(candidateId: number): void {
    this.router.navigate(['/video-call', candidateId]);
  }

  openScheduleDialog(email: string) {
    const dialogRef = this.dialog.open(InviteForInterviewComponent, {
      width: '400px',
      data: { email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendMailWithDate(email, result.date, result.time);
      }
    });
  }

  sendMailWithDate(email: string, date: string, time: string) {
    console.log(email);
    
    const serviceID = 'service_r57exjl';
    const templateID = 'template_mdpmcza';
    const publicKey = 'dNeV7WLUZjWN-Sp_T';

    const templateParams = {
      email: email,
      interview_date: date,
      interview_time: time
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Invitation sent successfully!');
      }, error => {
        console.error('FAILED...', error);
        alert('Failed to send invitation.');
      });
  }
}
