import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

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
        const roles = decodedToken.roles || []; 
        const storeId=decodedToken.storeId;
        const username= decodedToken.username;
    if(roles.length>0){
      localStorage.setItem("roles",roles);
      localStorage.setItem("token",token);
      localStorage.setItem("username",username);
      localStorage.setItem("storeId",storeId);
    }
    } else {
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
    const base64Url = token.split('.')[1]; 
    const jsonPayload = decodeURIComponent(escape(window.atob(base64Url))); 
    return JSON.parse(jsonPayload); 
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

logout(){
  localStorage.removeItem("roles");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("storeId");
}

}
