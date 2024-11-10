import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductsService } from '../../service/products.service';
import { AutheticationService } from '../../../login/service/authetication.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {

confirmDelete() {
this.productService.deleteProduct(this.productToDelete.name,parseInt(this.authService.getStoreId()||'0')).subscribe({
  next:()=>{
    let oldProducts =this.productService.allProducts.getValue();
    let newproducts= oldProducts.filter((p)=>p.name!==this.productToDelete.name);
    this.productService.allProducts.next(newproducts);

  }
})
}

constructor(private productService:ProductsService,private authService:AutheticationService){

}
  @Input()
productToDelete!: Product;


ngOnChanges(simpleChange:SimpleChanges):void{
if(simpleChange['productToDelete'] && this.productToDelete){

}
}
}
