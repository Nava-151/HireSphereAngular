import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserResumeDetails } from '../../../models/UserResumeDetails';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { User } from '../../../models/user';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-candidate-display',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './candidate-display.component.html',
  styleUrl: './candidate-display.component.css'
})
export class CandidateDisplayComponent implements OnInit {
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

  @Input() candidate!: UserResumeDetails;
  user!: User
  AnalysisReport!: UserResumeDetails;
  constructor(private userResumeService: ResumeDetailsService, private http: HttpClient, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    console.log('Candidate received:', this.candidate);

    if (this.candidate) {
      this.getUser();
      console.log('Candidate received:', this.candidate);
      this.getAiResponse();
      this.cdr.detectChanges();
    }
  }
  ngOnChanges() {
    console.log('Candidate received: in chabge', this.candidate);
    this.getUser()
  }

  getUser = () => {
    console.log("cand id: " + this.candidate.candidateId);
    this.userResumeService.getUser(this.candidate.candidateId).subscribe((user: User) => {
      this.user = user;
      console.log("user in get " + this.user);

    });
  }

  getAiResponse = () => {
    console.log("in ai response ");
    console.log(this.candidate.idResponse);

    this.userResumeService.getResponse(this.candidate.idResponse).subscribe((response: UserResumeDetails) => {
      this.AnalysisReport = response;
    });
  }
}
