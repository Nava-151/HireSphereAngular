import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdateDetails } from '../models/UserUpdateDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = 'http://localhost:5071/users'; // Your API endpoint

  constructor(private http: HttpClient) {}

  // Method to update user details
  updateUser(id: number, userData: UserUpdateDetails): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<UserUpdateDetails>(`${this.apiUrl}/${id}`);
  }
}
