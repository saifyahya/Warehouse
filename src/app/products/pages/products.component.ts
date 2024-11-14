import { Component,  } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product.model';
import { AutheticationService } from '../../login/service/authetication.service';
import { WarehouseService } from '../../warehouses/service/warehouse.service';
import { Warehouse } from '../../warehouses/model/warehouse.model';

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

  constructor(private productService: ProductsService, private authService: AutheticationService,private warehouseService:WarehouseService) {
  }

  ngOnInit(): void {
    this.getStoreProduct();
    this.subscToServiceData();
    this.getUserStore();

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
        this.getTotalStockLevel();

      }
    })
  }
  totalStockLevel:number=0;
  getTotalStockLevel(){
    this.totalStockLevel=0;
    this.products.forEach((p)=>{
      this.totalStockLevel+=p.stockLevel;
    })
  }
userWarehouse!:Warehouse;
  getUserStore(){
    let storeId= this.authService.getStoreId();
    if(storeId){
      this.warehouseService.getEmployeeWraehouse(parseInt(storeId)).subscribe((data)=>{
        this.userWarehouse=data;        
      })

    }
  }
}
