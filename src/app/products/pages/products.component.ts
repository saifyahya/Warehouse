import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product.model';
import { AutheticationService } from '../../login/service/authetication.service';
import { EditProductComponent } from '../components/edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
productToEdit!: Product;

actionProduct(product:Product) {
this.productToEdit=product;
}

  constructor(private productService: ProductsService, private authService: AutheticationService) {
  }

  ngOnInit(): void {
    this.getStoreProduct();
    this.subscToServiceData();
  }

  products: Product[] = []
  getStoreProduct() {
    let currentsStoreId = this.authService.getStoreId();
    if (currentsStoreId) {
      this.productService.getStoreProducts(parseInt(currentsStoreId)).subscribe();
    }   
  }

  subscToServiceData(){
    this.productService.allProducts.subscribe((data)=>{
      if(data!=null){
        this.products=data;
      }
    })
  }
}
