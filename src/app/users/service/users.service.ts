import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { NewUser } from '../models/add-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  allUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  baseUrl = 'http://localhost/onlineStore/api/accounts/users';

  constructor(private httpClient :HttpClient) {
  }

getAllUsers():Observable<void>{
  return this.httpClient.get<User[]>(this.baseUrl).pipe(map((data)=>this.allUsers.next(data)));
   }

   addNewUser(newUser:NewUser):Observable<string>{
    return this.httpClient.post<string>(`${this.baseUrl}/signup`,newUser)
    }
    
}
