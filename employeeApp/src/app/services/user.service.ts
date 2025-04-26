import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdateDetails } from '../models/UserUpdateDetails';
import { environment } from './enviroment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // Method to update user details
  updateUser(id: number, userData: UserUpdateDetails): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  getUser(userId: number): Observable<User> {
    console.log("in get user");
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
}
