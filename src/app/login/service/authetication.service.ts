import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NewUser } from '../../users/models/add-user.model';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(private httpClient: HttpClient,private router:Router) {
   }

  baseURL:string = "http://localhost/onlineStore/api/accounts/users";
   login( username:string, password:string):Observable<string>{
     return this.httpClient.post<{ token: string; }>(`${this.baseURL}/login`, { username: username, password: password }).pipe(map((res) => {
       let token = res.token;
       if (token) {
        const decodedToken = this.parseJwt(token);
        // Extract roles
        const roles = decodedToken.roles || []; // Adjust according to your claims structure
        const storeId=decodedToken.storeId;
        const username= decodedToken.username;
    if(roles.length>0){
      localStorage.setItem("roles",roles);
      localStorage.setItem("token",token);
      localStorage.setItem("username",username);
      localStorage.setItem("storeId",storeId);
    }
    } else {
        console.log('No token found');
    }
       return token;
     }));
   }

getStoreId():string |null{
return localStorage.getItem("storeId");
}

getUsername():string |null{
  return localStorage.getItem("userName");
  }

   parseJwt(token: string) {
    const base64Url = token.split('.')[1]; // Get the payload part
    const jsonPayload = decodeURIComponent(escape(window.atob(base64Url))); // Decode and handle special characters

    return JSON.parse(jsonPayload); // Parse the JSON string
}

hasToken():boolean{
  return localStorage.getItem("token")!==null;
}

getToken():string|null {
return localStorage.getItem("token");
} 

isManager(){
    let roles= localStorage.getItem("roles");
    if(roles){
      return roles.split(",").includes("Manager");
    }
    return false;
  }

    isEmployee(){
      let roles= localStorage.getItem("roles");
      if(roles){
        return roles.split(",").includes("Employee");
      }
      return false;
}
}
