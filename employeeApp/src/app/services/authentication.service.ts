
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User, userRole } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private apiUrl = 'http://localhost:5071/auth';
    public isLoggedIn: boolean = false;
    public : boolean = false;
    public currentUser: User | null = null;

    constructor(private http: HttpClient) {}

    // **רישום משתמש חדש**
    register(user: User): Observable<any> {
        return this.http.post<{id:number,user:User,token:string}>(`${this.apiUrl}/register`, user).pipe(
            tap((registered) => {
                this.currentUser = registered.user;
                localStorage.setItem("token",registered.token)
            })
        );
    }

    // **התחברות והתחלת סשן**
    login(credentials: { email: string; passwordHash: string }): Observable<any> {
        const res={email:credentials.email,passwordHash:credentials.passwordHash,role:userRole.Employer};
        return this.http.post<{ token: string; }>(`${this.apiUrl}/login`, res).pipe(
            tap((response) => {
                console.log("in login");
                
                localStorage.setItem("token", response.token); 
                this.isLoggedIn = true;
            })
        );
    }

    // **התנתקות מהמערכת**
    logout(): void {
        localStorage.removeItem("token"); // מחיקת הטוקן
        this.isLoggedIn = false;
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
