import { Component } from '@angular/core';
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
  candidatesList:UserResumeDetails[]=[];
constructor(private resumeDetailsService: ResumeDetailsService) { }


getall=()=>{
  this.resumeDetailsService.analysisResults$.subscribe(data=>this.candidatesList=data);
}
}
