
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User, userRole } from '../models/user';
import { environment } from './enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private apiUrl = `${environment.apiUrl}/auth`
    public isLoggedIn: boolean = false;
    public : boolean = false;
    public currentUser: User | null = null;

    constructor(private http: HttpClient) {}

    register(user: User): Observable<any> {
        return this.http.post<{id:number,user:User,token:string}>(`${this.apiUrl}/register`, user).pipe(
            tap((registered) => {
                this.currentUser = registered.user;
                sessionStorage.setItem("token",registered.token)
                sessionStorage.setItem("id", registered.id+""); 

            })
        );
    }

    login(credentials: { email: string; passwordHash: string }): Observable<any> {
        const res={Email:credentials.email,PasswordHash:credentials.passwordHash,Role:1};
        console.log(res);
        
        return this.http.post<{ token: string;id:number }>(`${this.apiUrl}/login`, res).pipe(
            tap((response) => {
                console.log("in login");
                sessionStorage.setItem("token", response.token); 
                sessionStorage.setItem("id", response.id+""); 
                this.isLoggedIn = true;
            })
        );
    }

    logout(): void {
        sessionStorage.removeItem("token"); // מחיקת הטוקן
        this.isLoggedIn = false;
        this.currentUser = null;
    }

    isAuthenticated(): boolean {
        return !!sessionStorage.getItem("token");
    }

    getToken(): string | null {
        return sessionStorage.getItem("token");
    }
    
}
