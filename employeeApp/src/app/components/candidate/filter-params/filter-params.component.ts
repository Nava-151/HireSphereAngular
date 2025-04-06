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
    CandidatesComponent
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

  // Form values
  experienceYears: number = 0;
  selectedLanguages: string[] = [];
  englishLevel: string = '';
  educationLevel: string = '';

  // Filter object to send
  paramForFilter: Filter = new Filter(4, "", "", "");

  programmingLanguages = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Ruby",
    "Swift", "Kotlin", "Go", "PHP", "Rust", "Dart", "React", "Angular", "View",
    "Node", "SQL", "Mongo", "HTML", "CSS", "C", "Cobol", "Asembler"
/*************  ✨ Codeium Command ⭐  *************/
/**

/******  7107f75d-8dc2-47c9-abb2-29d894cc7968  *******/  ];

  toggleFilter(filter: any) {
    this.selectedFilter = filter.filter;
  }

  startFilter() {
    // Clear previous filter data
    this.paramForFilter = new Filter(4, "", "", "");

    // Fill only selected filter
    switch (this.selectedFilter) {
      case "Experience":
        this.paramForFilter.Experience = this.experienceYears;
        break;
      case "Languages":
        this.paramForFilter.Languages = this.selectedLanguages.join(" ");
        break;
      case "EnglishLevel":
        this.paramForFilter.EnglishLevel = this.englishLevel;
        break;
      case "Education":
        this.paramForFilter.Education = this.educationLevel;
        break;
    }

    console.log("Final Filter Parameters:", this.paramForFilter);
    this.resumeDetails.sendForFilter(this.paramForFilter);
  }
}
