import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Product } from '../../../products/model/product.model';
import { Order } from '../../../orders/models/order.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

viewUserOrders(orders: Order[],username: string) {
  if(orders.length>0)
  this.router.navigate(['/dashboard-orders'], {state: { orders },queryParams:{username}});
}
viewUserProducts(products:Product[],username:string) {
  if(products.length>0)
  this.router.navigate(['/dashboard-products'], {state: { products },queryParams:{username}});
}

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
