import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AutheticationService } from "../login/service/authetication.service";

@Injectable({
    providedIn: 'root'
  })
  export class ActivateRoutesService implements CanActivate {
  
    constructor(private auth: AutheticationService, private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      if (this.auth.getToken()) {
        return true;
      }
      else {
        this.router.navigateByUrl("/login");
        return false;
      }
    }
  }