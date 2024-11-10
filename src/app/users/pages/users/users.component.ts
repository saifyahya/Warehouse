import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Product } from '../../../products/model/product.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
viewUserProducts(products:Product[],username:string) {
  this.router.navigate(['/dashboard-products'], {state: { products },queryParams:{username}});}


  myUsers: User[] = [];

  constructor(private userService: UsersService,private router:Router) {

  }
  ngOnInit() {
    this.getAllUsers()
    this.subscribeToAllusers();
  }

  subscribeToAllusers() {
    this.userService.allUsers.subscribe((data) => {
      this.myUsers = data;
      console.log(data);
      
    })
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe();
  }

}
