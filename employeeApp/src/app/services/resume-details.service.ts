// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from '../models/user';
// import { UserResumeDetails } from '../models/UserResumeDetails';
// import { Filter } from '../models/filter';
// import { environment } from './enviroment.prod';

// @Injectable({
//   providedIn: 'root'
// })
// export class ResumeDetailsService {

//   private apiUrl = environment.apiUrl;

//   private analysisResultsSubject = new BehaviorSubject<any[]>([]);
//   analysisResults$ = this.analysisResultsSubject.asObservable(); // Observable שהקומפוננטות יאזינו לו

//   constructor(private http: HttpClient) {
//     console.log("in resume details service");
//     this.fetchAnalysisResults(); // קריאה ראשונית
//   }

//   fetchAnalysisResults(): Observable<UserResumeDetails[]> {
//     console.log("in fetchAnalysisResults");
//     return this.http.get<UserResumeDetails[]>(`${this.apiUrl}/data`)
//   }


//   sendForFilter(filters: Filter) {
//     console.log("in sendForFilter");
//     console.log(`${this.apiUrl}/data/filter`);
//     return this.http.post<any>(`${this.apiUrl}/data/filter`, filters);
//   }

//   updateMark(mark:number){
//     const id =+localStorage.getItem("id")!;
//     console.log("in update mark");
//     return this.http.post<any>(`${this.apiUrl}/data/updateMark`,mark);
//   }
//   addMark(mark: number) {
//     const id = localStorage.getItem('id');
//     if (!id) {
//       console.error('ID not found in localStorage');
//       return;
//     }
//     const params = new HttpParams()
//       .set('mark', mark.toString())
//       .set('id', id);

//     return this.http.post(`${this.apiUrl}/data/updateMark`, null, { params });
//   }




//   getResponse(idResponse: number): Observable<UserResumeDetails> {
//     return this.http.get<UserResumeDetails>(`${this.apiUrl}/aiResponse/${idResponse}`);
//   }


//   downloadFile(fileKey: string): Observable<Blob> {
//     return this.http.get(`${this.apiUrl}/files/download/?fileName=${fileKey}`, {
//       responseType: 'blob'
//     });
//   }

//   viewFile(ownerId:number): Observable<string> {
//     const params = new HttpParams().set('ownerId', ownerId);
//     console.log("in view file");
    
//     return this.http.get<string>(`${this.apiUrl}/files/view`, { params });
//   }
  

// }
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserResumeDetails } from '../models/UserResumeDetails';
import { Filter } from '../models/filter';
import { environment } from './enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class ResumeDetailsService {

  private apiUrl = environment.apiUrl;

  private analysisResultsSubject = new BehaviorSubject<UserResumeDetails[]>([]);
  analysisResults$ = this.analysisResultsSubject.asObservable(); // הקומפוננטות יאזינו לו

  constructor(private http: HttpClient) {
    console.log("in resume details service");
    this.startPolling(); // התחלת פולינג
  }

  /** מפעיל פולינג: מבצע קריאה מיידית ואז כל 30 שניות */
  private startPolling() {
    timer(0, 30000) // מייד + כל 30 שניות
      .pipe(
        switchMap(() => this.fetchAnalysisResults())
      )
      .subscribe(results => {
        this.analysisResultsSubject.next(results);
      });
  }

  fetchAnalysisResults(): Observable<UserResumeDetails[]> {
    return this.http.get<UserResumeDetails[]>(`${this.apiUrl}/data`);
  }

  sendForFilter(filters: Filter) {
    return this.http.post<any>(`${this.apiUrl}/data/filter`, filters);
  }

  updateMark(mark: number) {
    const id = +localStorage.getItem("id")!;
    return this.http.post<any>(`${this.apiUrl}/data/updateMark`, mark);
  }

  addMark(mark: number) {
    const id = localStorage.getItem('id');
    if (!id) {
      console.error('ID not found in localStorage');
      return;
    }
    const params = new HttpParams()
      .set('mark', mark.toString())
      .set('id', id);

    return this.http.post(`${this.apiUrl}/data/updateMark`, null, { params });
  }

  getResponse(idResponse: number): Observable<UserResumeDetails> {
    return this.http.get<UserResumeDetails>(`${this.apiUrl}/aiResponse/${idResponse}`);
  }

  downloadFile(fileKey: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/download/?fileName=${fileKey}`, {
      responseType: 'blob'
    });
  }

  viewFile(ownerId: number): Observable<string> {
    const params = new HttpParams().set('ownerId', ownerId);
    return this.http.get<string>(`${this.apiUrl}/files/view`, { params });
  }
}
