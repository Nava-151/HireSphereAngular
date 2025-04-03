import { Component, OnInit } from '@angular/core';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { UserResumeDetails } from '../../../models/UserResumeDetails';
import { CandidateDisplayComponent } from '../candidate-display/candidate-display.component';

@Component({
  selector: 'app-candidate',
  imports: [CandidateDisplayComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {
  candidatesList: UserResumeDetails[] = [];
  constructor(private resumeDetailsService: ResumeDetailsService) {
    this.resumeDetailsService.fetchAnalysisResults().subscribe(data => {
      this.candidatesList = data
    })
  }
  // ngOnInit(): void {
  //   this.resumeDetailsService.fetchAnalysisResults().subscribe(data => {this.candidatesList = data
  //     console.log("Data received:", data);
  //     console.log("cand[0]");
  //     console.log(this.candidatesList[0]);
  //   })
  // }




}

