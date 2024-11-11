import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutheticationService } from '../service/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup = new FormGroup({
  "username": new FormControl(),
  "password":new FormControl()
})

wrongCredentials:boolean=false;
constructor(private authService:AutheticationService,private router:Router){
}

ngOnInit(){

}

submitLogin(){
  this.wrongCredentials=false;

let username = this.loginForm.controls['username'].value;
let password  = this.loginForm.controls['password'].value;
this.authService.login(username,password).subscribe({
  next:(data)=>
    
    {
      if(this.authService.isManager()){

        this.router.navigateByUrl('/users');
      }else{
        
        this.router.navigateByUrl('/products');
      }
  
  },
  error:(err)=>{
    this.wrongCredentials=true;
  }
})
}

}
