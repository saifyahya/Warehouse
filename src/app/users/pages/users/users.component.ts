import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Product } from '../../../products/model/product.model';
import { Order } from '../../../orders/models/order.model';
import { AddUserComponent } from '../../components/add-user/add-user.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  @ViewChild('adduserComp') adduserComp!: ElementRef<AddUserComponent>;
  myUsers: User[] = [];

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.getAllUsers()
    this.subscribeToAllusers();
  }

  newUserPopup() {
    this.adduserComp.nativeElement.signupForm.reset();
  }

  viewUserOrders(orders: Order[], username: string) {
    if (orders.length > 0)
      this.router.navigate(['/dashboard-orders'], { state: { orders }, queryParams: { username } });
  }

  viewUserProducts(products: Product[], username: string) {
    if (products.length > 0)
      this.router.navigate(['/dashboard-products'], { state: { products }, queryParams: { username } });
  }

  subscribeToAllusers() {
    this.userService.allUsers.subscribe((data) => {
      this.myUsers = data;
    })
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe();
  }

}
