import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserResumeDetails } from '../models/UserResumeDetails';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class ResumeDetailsService {

  private apiUrl = 'http://localhost:5071';

  private analysisResultsSubject = new BehaviorSubject<any[]>([]);
  analysisResults$ = this.analysisResultsSubject.asObservable(); // Observable שהקומפוננטות יאזינו לו

  constructor(private http: HttpClient) {
    console.log("in resume details service");
    this.fetchAnalysisResults(); // קריאה ראשונית
  }

  fetchAnalysisResults(): Observable<UserResumeDetails[]> {
    console.log("in fetchAnalysisResults");
    return this.http.get<UserResumeDetails[]>(`${this.apiUrl}/data`)
  }


  sendForFilter(filters: Filter) {
    console.log("in sendForFilter");
    console.log(`${this.apiUrl}/data/filter`);
    return this.http.post<any>(`${this.apiUrl}/data/filter`, filters);
  }



  getUser(userId: number): Observable<User> {
    console.log("in get user");
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getResponse(idResponse: number): Observable<UserResumeDetails> {
    return this.http.get<UserResumeDetails>(`${this.apiUrl}/aiResponse/${idResponse}`);
  }


  downloadFile(fileKey: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/download/?fileName=${fileKey}`, {
      responseType: 'blob'
    });
  }

}
