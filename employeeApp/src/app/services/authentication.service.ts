// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { User } from '../models/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {


//     private apiUrl = 'http://localhost:5071/auth';
//     public isLoggedIn:boolean = false; 
//     public isTeacher:boolean=false;
//     public currentUser: User | null = null;
//     constructor( private http: HttpClient) { }
  
//     // Register a new user
//     register(user: User): Observable<any> {
//       this.currentUser = user;
//       return this.http.post<User>(`${this.apiUrl}/register`, user);
//     }

//     login(credentials: { email: string; passwordHash: string }): Observable<any> {
//       return this.http.post<User>(`${this.apiUrl}/login`, credentials);
//     }
  
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private apiUrl = 'http://localhost:5071/auth';
    public isLoggedIn: boolean = false;
    public isTeacher: boolean = false;
    public currentUser: User | null = null;

    constructor(private http: HttpClient) {}

    // **רישום משתמש חדש**
    register(user: User): Observable<any> {
        return this.http.post<User>(`${this.apiUrl}/register`, user).pipe(
            tap((registeredUser) => {
                this.currentUser = registeredUser;
            })
        );
    }

    // **התחברות והתחלת סשן**
    login(credentials: { email: string; passwordHash: string }): Observable<any> {
        return this.http.post<{ token: string; isTeacher: boolean }>(`${this.apiUrl}/login`, credentials).pipe(
            tap((response) => {
                localStorage.setItem("token", response.token); 
                this.isLoggedIn = true;
                this.isTeacher = response.isTeacher;
            })
        );
    }

    // **התנתקות מהמערכת**
    logout(): void {
        localStorage.removeItem("token"); // מחיקת הטוקן
        this.isLoggedIn = false;
        this.isTeacher = false;
        this.currentUser = null;
    }

    // **בדיקה אם המשתמש מחובר**
    isAuthenticated(): boolean {
        return !!localStorage.getItem("token");
    }

    // **קבלת טוקן מה-Storage**
    getToken(): string | null {
        return localStorage.getItem("token");
    }
}
