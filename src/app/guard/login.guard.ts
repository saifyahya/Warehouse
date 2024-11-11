import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AutheticationService } from "../login/service/authetication.service";

@Injectable({
    providedIn: 'root'
  })
  export class LoginActivateService implements CanActivate{
    isLoggedin = this.auth.getToken();
  
    constructor(private router:Router,private auth:AutheticationService) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      console.log(this.isLoggedin);
      
      if (this.auth.getToken()) {
        if(this.auth.isManager()){
        this.router.navigateByUrl("/users");
        }
      else{
      this.router.navigateByUrl("/products")
        return false;}
      }
      return true;
    }
}
  