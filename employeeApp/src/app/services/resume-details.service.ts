import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserResumeDetails } from '../models/UserResumeDetails';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class ResumeDetailsService {

  private apiUrl = 'https://localhost:5071/api/';

  private analysisResultsSubject = new BehaviorSubject<any[]>([]);
  analysisResults$ = this.analysisResultsSubject.asObservable(); // Observable שהקומפוננטות יאזינו לו

  constructor(private http: HttpClient) {
    this.fetchAnalysisResults(); // קריאה ראשונית
  }

  public fetchAnalysisResults() {
    this.http.get<UserResumeDetails[]>(`${this.apiUrl}/data`)
      .subscribe(data => {
        this.analysisResultsSubject.next(data)
      });
  }

  sendForFilter=(filters:Filter)=>{
    return this.http.post<Filter>(`${this.apiUrl}/data/filter`,filters);
  }



  getUser = (userId: number): User => {
    let user: User = new User('', '', '', '', 0);
    this.http.get<User>(`${this.apiUrl}/user/${userId}`).subscribe(data => user = data);
    return user;
  }
  getResponse = (idResponse: number): UserResumeDetails => {
    let resp: UserResumeDetails = new UserResumeDetails(0,0,'', 0);
    this.http.get<UserResumeDetails>(`${this.apiUrl}/aiResponse/${idResponse}`).subscribe(data => resp = data);
    return resp;
  }

  getPresignedUrl(fileKey: string): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/get-presigned-url?fileKey=${fileKey}`);
  }


}
