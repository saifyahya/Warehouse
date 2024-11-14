import { Component, ViewChild } from '@angular/core';
import { Order } from '../models/order.model';
import { AutheticationService } from '../../login/service/authetication.service';
import { OrdersService } from '../service/orders.service';
import { Router } from '@angular/router';
import { ActionOrderComponent } from '../components/action-order/action-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  @ViewChild('actionOrder') ActionOrderComponent!:ActionOrderComponent;
actionOrderEvent(order: Order,actionType:string) {
this.ActionOrderComponent.action=actionType;
this.ActionOrderComponent.newStatus=order.status;
this.ActionOrderComponent.orderToAction=order}
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
