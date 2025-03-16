import { Component, Input } from '@angular/core';
import { UserResumeDetails } from '../../../models/UserResumeDetails';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { User } from '../../../models/user';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-candidate-display',
  imports: [MatCardModule,MatTableModule],
  templateUrl: './candidate-display.component.html',
  styleUrl: './candidate-display.component.css'
})
export class CandidateDisplayComponent {
downloadFile(fileKey: string) {
  // return this.http.get(`${this.url}/get-presigned-url?fileKey=${fileKey}`, { responseType: 'blob' })
}
  @Input() candidate!: UserResumeDetails;
  user!:User
  AnalysisReport!:UserResumeDetails;
constructor(private userResumeService:ResumeDetailsService){}

getUser=()=>{
  this.user=this.userResumeService.getUser(this.candidate.CandidateId);
}

getAiResponse=()=>{
  this.AnalysisReport=this.userResumeService.getResponse(this.candidate.IdResponse);
}
}
