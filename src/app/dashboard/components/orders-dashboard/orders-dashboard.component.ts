import { Component } from '@angular/core';
import { Order } from '../../../orders/models/order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrl: './orders-dashboard.component.css'
})
export class OrdersDashboardComponent {
orders:Order[]=[];
username:string='';

constructor(private route:ActivatedRoute){}
  ngOnInit(){
    this.getUserproducts();
    this.getUsername();
  }
  getUserproducts(){
    if (history.state.orders) {
      this.orders = history.state.orders;
    } else {
    }
  }
  getUsername(){
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }
}
