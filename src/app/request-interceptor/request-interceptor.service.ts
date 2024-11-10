import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AutheticationService } from "../login/service/authetication.service"
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root'
  })
  export class HttpRequestInterceptorService implements HttpInterceptor{
  
    constructor(private auth: AutheticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(this.auth.hasToken()){
        console.log("token sended");
        
        req=req.clone({
          setHeaders:{
            "Authorization":"Bearer "+this.auth.getToken()
          }
        })
      }
      return next.handle(req)
    }
  }