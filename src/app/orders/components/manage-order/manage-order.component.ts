import { Component } from '@angular/core';
import { ProductsService } from '../../../products/service/products.service';
import { AutheticationService } from '../../../login/service/authetication.service';
import { Product } from '../../../products/model/product.model';
import { Order } from '../../models/order.model';
import { OrdersService } from '../../service/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent {


  products: Product[] = [];
  totalQuantity: number=0;
  totalPrice: number = 0;
  shippingAddress: any;
  paymentMethod: any;
  customerDetails:any;
  selectedProductsArray: Product[] = [];
  constructor(private productService: ProductsService, private authService: AutheticationService,
    private orderService:OrdersService, private router:Router) { }
  ngOnInit() {
    this.getUserProducts();
    this.subscribeToProductsService();
  }

  getUserProducts() {
    let storeId = this.authService.getStoreId();
    if (storeId) {
      this.productService.getStoreProducts(parseInt(storeId)).subscribe();
    }
  }
  subscribeToProductsService() {
    this.productService.allProducts.subscribe((data: Product[]) => {
      if (data !== null) {
        this.products = data.map(product => ({
          ...product,
          orderQuantity: product.orderQuantity ?? 0
        }));
        console.log(this.products);
      }
    })
  }

  updateQuantity(p: Product, quantitiy: number) {
    if (quantitiy > 0) {
      if (p.orderQuantity! < p.stockLevel) {
        p.orderQuantity! += 1;
        this.totalQuantity+=1;
        this.totalPrice+=p.price;
        let product: Product | undefined = this.selectedProductsArray.find((product) => product.code === p.code);
        if (product) {
        } else {
          this.selectedProductsArray.push(p);
        }
      }
    } else {
      if (p.orderQuantity! > 0) {
        p.orderQuantity! -= 1;
        this.totalQuantity-=1;
        this.totalPrice-=p.price;
        let product: Product | undefined = this.selectedProductsArray.find((product) => product.code === p.code);
        if (product && product.orderQuantity === 0) {
          this.selectedProductsArray = this.selectedProductsArray.filter((product) => product.code !== p.code)
        } else if (product && product.orderQuantity! > 1) {
        }
      }

    }

  }
  completeOrder() {
    let orderInfo= new Map<string,number>();
    this.selectedProductsArray.forEach((p)=>{
      orderInfo.set(p.name,p.orderQuantity!);
    })
    const orderInfoObj = Object.fromEntries(orderInfo);

    let newOrder:Order={
      code:'',
      totalPrice:this.totalPrice,
      totalQuantity:this.totalQuantity,
      shippingAddress:this.shippingAddress,
      paymentMethod:this.paymentMethod,
      customerDetails:this.customerDetails,
      status:'Ready to deliver',
      storeId:this.selectedProductsArray[0].storeId,
      order:orderInfoObj,
      products:[]
    }
    console.log(newOrder);
    
    this.orderService.createStoreOrder(newOrder).subscribe({
      next:(data)=>{
        this.router.navigateByUrl('/orders')
      }
    })
  }

}
