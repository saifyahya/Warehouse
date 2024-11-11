import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult } from "@angular/router";
import { AutheticationService } from "../login/service/authetication.service";

@Injectable({
    providedIn: 'root'
  })
  export class EmplyeeActivateRoutesService implements CanActivate {
  
    constructor(private auth: AutheticationService, private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      if (this.auth.getToken() && this.auth.isEmployee()) {
        return true;
      }
      else {
        this.router.navigateByUrl("/login");
        return false;
      }
    }
  }