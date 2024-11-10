import { Component } from '@angular/core';
import { AutheticationService } from '../login/service/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private auth: AutheticationService, private router: Router) {
}


// isManager(): boolean {
//   return this.auth.isManager();
// }


// checkLogin(): boolean {
//   if (this.auth.getToken())
//     return true
//   return false;
// }

// logout() {
//   this.auth.logout();
//   this.router.navigateByUrl('/signin');
// }

// getCurrentUsername():string{
//   return this.auth.getCurrentUserName();
// }

}