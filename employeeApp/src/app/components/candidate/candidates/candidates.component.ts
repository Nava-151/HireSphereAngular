import { Component, OnInit } from '@angular/core';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { UserResumeDetails } from '../../../models/UserResumeDetails';
import { CandidateDisplayComponent } from '../candidate-display/candidate-display.component';
import { Filter } from '../../../models/filter';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { DeferBlockModule } from '@angular/core';
@Component({
  selector: 'app-candidate',
  imports: [CandidateDisplayComponent, FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    CommonModule,
    MatProgressSpinnerModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {
  showNoCandidatesMessage = false;
  candidatesList$!: Observable<UserResumeDetails[]>; // שימי לב שיש פה Observable

  constructor(private resumeDetailsService: ResumeDetailsService) {
    this.candidatesList$ = this.resumeDetailsService.analysisResults$;
  }

  paramsList: any[] = [
    { id: 0, filter: "Experience", icon: "work" },
    { id: 2, filter: "Languages", icon: "language" },
    { id: 3, filter: "EnglishLevel", icon: "translate" },
    { id: 4, filter: "Education", icon: "school" },
    { id: 5, filter: "Mark", icon: "bookmark" }

  ];

  selectedFilter: string | null = null;

  experienceYears: number = 0;
  selectedLanguages: string[] = [];
  englishLevel: string = '';
  educationLevel: string = '';
  testMark: number = 0;

  paramForFilter: Filter = new Filter(4, "", "", "");

  programmingLanguages = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Ruby",
    "Swift", "Kotlin", "Go", "PHP", "Rust", "Dart", "React", "Angular", "View",
    "Node", "SQL", "Mongo", "HTML", "CSS", "C", "Cobol", "Asembler"
  ];

  toggleFilter(filter: any) {
    this.selectedFilter = filter.filter;
  }

  timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
    this.showNoCandidatesMessage = true;
  }, 7000);

  startFilter() {
    this.paramForFilter = new Filter(0, "", "", "", 0);
    switch (this.selectedFilter) {
      case "Experience":
        this.paramForFilter.experience = this.experienceYears;
        break;
      case "Languages":
        this.paramForFilter.languages = this.selectedLanguages.join(" ");
        break;
      case "EnglishLevel":
        this.paramForFilter.englishLevel = this.englishLevel;
        break;
      case "Education":
        this.paramForFilter.education = this.educationLevel;
        break;
      case "Mark":
        this.paramForFilter.mark = this.testMark;
        break;
    }
    console.log("Final Filter Parameters:", this.paramForFilter);

    this.resumeDetailsService.sendForFilter(this.paramForFilter).subscribe(data => {
      console.log(data);
      this.candidatesList$ = data;
    });

  }

}

