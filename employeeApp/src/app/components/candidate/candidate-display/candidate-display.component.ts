import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { UserResumeDetails } from '../../../models/UserResumeDetails';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { User } from '../../../models/user';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-candidate-display',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './candidate-display.component.html',
  styleUrl: './candidate-display.component.css'
})
export class CandidateDisplayComponent  {

  watch = (id: number) => {
    console.log("in watch compo");
    this.userResumeService.viewFile(id).subscribe(response => {
      console.log(response);
      if (response ) {
        window.open(response, '_blank');
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
    console.log("in inviteToInterview");
    
    this.router.navigate(['/video-call', candidateId]);
    console.log("afye in");
    
  }
  
  @Input() userDetails!: UserResumeDetails;
  user!: User
  AnalysisReport!: UserResumeDetails;
  constructor(private userResumeService: ResumeDetailsService, private http: HttpClient, private cdr: ChangeDetectorRef,private userService:UserService) { }
  showVideoCall = false;
   router=inject(Router);
 
}
