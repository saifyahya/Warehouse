import { Component } from '@angular/core';
import { Order } from '../models/order.model';
import { AutheticationService } from '../../login/service/authetication.service';
import { OrdersService } from '../service/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
manageOrder() {
this.router.navigateByUrl('/manage-order');
}
orders:Order[]=[];

constructor(private authService:AutheticationService, private orderService:OrdersService,private router:Router){
}

ngOnInit(){
  this.getAllOrders();
  this.subscToServiceOrders();
}

getAllOrders(){
  let storeId=this.authService.getStoreId();
  if(storeId){
    this.orderService.getStoreOrders(parseInt(storeId)).subscribe();
  }
}

subscToServiceOrders(){
  this.orderService.allOrders.subscribe((data)=>{
    if(data!==null){
      this.orders=data;      
    }
  })
}



}
