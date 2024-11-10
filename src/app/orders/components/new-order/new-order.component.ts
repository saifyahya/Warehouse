import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../products/model/product.model';
import { Order } from '../../models/order.model';
import { OrdersService } from '../../service/orders.service';
import { AutheticationService } from '../../../login/service/authetication.service';
import { ProductsService } from '../../../products/service/products.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {


constructor(private orderService:OrdersService, private authService:AutheticationService,private productService:ProductsService){}


submit() {
 let orderInfo: Map <string, number> = new Map<string, number>();
 let totalQuantity=0;
 let totalPrice=0;
 let products = this.orderForm.controls['products'].value;
 console.log(products);
 
//   let newOrder:Order = {
//   code:'',
// shippingAddress:this.orderForm.controls['shippingAddress'].value().trim(),
// paymentMethod:this.orderForm.controls['shippingAddress'].value().trim(),
// customerDetails:this.orderForm.controls['shippingAddress'].value().trim(),
// status:'ready to deliver',
// storeId:parseInt(this.authService.getStoreId()||'0'),
// order:orderInfo
// }
}

getProducts(){
  this.productService.getStoreProducts(parseInt(this.authService.getStoreId()||'0')).subscribe();
  this.productService.allProducts.subscribe((data)=>{
    this.products=data;
    console.log("recieved products",data);
    
  })
}

  orderForm!: FormGroup;
orderAlreadyExists: boolean=false;
products:Product[]=[];

ngOnInit(){
  this.initializeForm();
  this.getProducts();
}

  initializeForm(){
    this.orderForm = new FormGroup({
      'code': new FormControl('', [Validators.required]),
      'shippingAddress': new FormControl('', [Validators.required]),
      'paymentMethod': new FormControl('', [Validators.required]),
      'customerDetails': new FormControl('', [Validators.required]),
      'products': new FormControl([], [Validators.required])  
    }); 
  }
  
}
