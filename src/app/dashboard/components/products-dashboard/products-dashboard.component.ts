import { Component } from '@angular/core';
import { Product } from '../../../products/model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.css'
})
export class ProductsDashboardComponent {
products: Product[]=[];
username='';

constructor(private route: ActivatedRoute){
  
}

ngOnInit(){
  this.getUserproducts();
  this.getUsername();
}
getUserproducts(){
  if (history.state.products) {
    this.products = history.state.products;
  } else {
  }
}
getUsername(){
  this.route.queryParams.subscribe(params => {
    this.username = params['username'];
  });
}



}
