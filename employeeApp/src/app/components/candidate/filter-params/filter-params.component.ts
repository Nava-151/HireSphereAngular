import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';4
import { MatCheckboxModule } from '@angular/material/checkbox';
import { filter } from 'rxjs';
import { Filter } from '../../../models/filter';
import { ResumeDetailsService } from '../../../services/resume-details.service';
@Component({
  selector: 'app-filter-params',
  imports: [ 
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  templateUrl: './filter-params.component.html',
  styleUrl: './filter-params.component.css'
})
export class FilterParamsComponent {

  constructor(private resumeDetails:ResumeDetailsService
  
  ){}
  paramsList: any[] = [
    { id: 0, filter: "Experience", icon:"work"},
    { id: 2, filter: "Languages" ,icon:"language"},
    { id: 3, filter: "EnglishLevel", icon:"translate"},
    { id: 4, filter: "Education", icon:"school"},
  ];
  selectedFilter: string | null = null;
  experienceYears: number  = 0;
  selectedLanguages: string[] = [];
  englishLevel: string  = '';
  educationLevel: string  = ' ';

  filter: string | null = null;
  paramForFilter:Filter=new Filter(0,"","","");
  langStr:string="";
  programmingLanguages = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Ruby",
    "Swift", "Kotlin", "Go", "PHP", "Rust", "Dart","React","Angular","View","Node","SQL","Mongo","HTML","CSS","C","Cobol","Asembler"
  ];
  
  
setEducation(education: string) {
  this.educationLevel=education
}

  toggleFilter(filter: any) {
    console.log("in toggle");
    
    this.selectedFilter = filter.filter;
    if(filter == "Experience"){
      this.paramForFilter.Experience=this.experienceYears;
    }
    else if(filter == "Languages"){
      this.selectedLanguages.forEach(s=>this.langStr+=s+" ");
      this.paramForFilter.Languages=this.langStr;
    }
    else if(filter == "EnglishLevel"){
      this.paramForFilter.EnglishLevel=this.englishLevel;
    }
    else{
      this.paramForFilter.Education=this.educationLevel;
    }

this.paramForFilter  }
  startFilter() {
    console.log(this.experienceYears);
    console.log(this.paramForFilter);
    this.resumeDetails.sendForFilter(this.paramForFilter);
  }
}
