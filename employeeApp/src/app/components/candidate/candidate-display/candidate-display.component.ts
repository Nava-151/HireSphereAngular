import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserResumeDetails } from '../../../models/UserResumeDetails';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { User } from '../../../models/user';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { VideoCallComponent } from '../../video-call/video-call.component';
@Component({
  selector: 'app-candidate-display',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule,VideoCallComponent],
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
    this.showVideoCall=true
    // שלב ראשון: שליחת הזמנה ל-Backend או WebSocket
    // כרגע לצורך בדיקה פשוטה, נדמה שליחת הזמנה לקונסול
    console.log('Inviting candidate to interview with ID:', candidateId);
  
    // בעתיד: תשלבי כאן קריאה ל-API או SignalR או WebSocket
  }
  
  @Input() userDetails!: UserResumeDetails;
  user!: User
  AnalysisReport!: UserResumeDetails;
  constructor(private userResumeService: ResumeDetailsService, private http: HttpClient, private cdr: ChangeDetectorRef,private userService:UserService) { }
  showVideoCall = false;
 
}
