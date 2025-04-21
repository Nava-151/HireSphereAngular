import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Filter } from '../../../models/filter';
import { ResumeDetailsService } from '../../../services/resume-details.service';
import { CandidatesComponent } from "../candidates/candidates.component";

@Component({
  selector: 'app-filter-params',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  templateUrl: './filter-params.component.html',
  styleUrl: './filter-params.component.css'
})
export class FilterParamsComponent {

  constructor(private resumeDetails: ResumeDetailsService) {}

  paramsList: any[] = [
    { id: 0, filter: "Experience", icon: "work" },
    { id: 2, filter: "Languages", icon: "language" },
    { id: 3, filter: "EnglishLevel", icon: "translate" },
    { id: 4, filter: "Education", icon: "school" },
  ];

  selectedFilter: string | null = null;

  experienceYears: number = 0;
  selectedLanguages: string[] = [];
  englishLevel: string = '';
  educationLevel: string = '';

  paramForFilter: Filter = new Filter(4, "", "", "");

  programmingLanguages = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Ruby",
    "Swift", "Kotlin", "Go", "PHP", "Rust", "Dart", "React", "Angular", "View",
    "Node", "SQL", "Mongo", "HTML", "CSS", "C", "Cobol", "Asembler"
 ];

  toggleFilter(filter: any) {
    this.selectedFilter = filter.filter;
  }

  startFilter() {
    this.paramForFilter = new Filter(4, "", "", "");
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
    }
    console.log("Final Filter Parameters:", this.paramForFilter);
    this.resumeDetails.sendForFilter(this.paramForFilter).subscribe(data => {
      // console.log(data);
    });
    
  }
}
