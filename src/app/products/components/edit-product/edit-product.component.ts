import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../model/product.model';
import { ProductsService } from '../../service/products.service';
import { AutheticationService } from '../../../login/service/authetication.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
productAlreadyExist: boolean=false;
@Input()
productToEdit!:Product;
@ViewChild('closeButton')closeButton!:ElementRef<HTMLButtonElement>;
constructor(private productService:ProductsService,private authService:AutheticationService){
}


submitEdit() {
  let product: Product = {
    name: this.productForm.controls['name'].value.trim(),
    description: this.productForm.controls['description'].value.trim(),
    price: this.productForm.controls['price'].value,
    stockLevel: this.productForm.controls['stockLevel'].value,
    storeId: parseInt(this.authService.getStoreId()||'0'),
    code:''
  }
this.productService.editProduct(this.productToEdit.name,product).subscribe({
  next:()=>{
  let oldProducts = this.productService.allProducts.getValue();
    oldProducts.forEach((p)=>{
    if(p.name===this.productToEdit.name){
      p.name=product.name;
      p.description=product.description;
      p.price=product.price;
      p.stockLevel=product.stockLevel;
    }
  })
  this.productService.allProducts.next(oldProducts);
this.closeButton.nativeElement.click();
},
error:()=>{
  this.productAlreadyExist=true;
  setTimeout(() => {
    this.productAlreadyExist=false;
  }, 3000);
}
})
}
productForm: FormGroup= new FormGroup({
    "name": new FormControl('', [Validators.required]),
    "description": new FormControl('', [Validators.required]),
    "price": new FormControl('', [Validators.required]),
    "stockLevel": new FormControl('', [Validators.required]),
  });

  ngOnInit(){
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && this.productToEdit) {
      this.productForm.patchValue({
        name: this.productToEdit.name,
        description: this.productToEdit.description,
        price: this.productToEdit.price,
        stockLevel: this.productToEdit.stockLevel
      });
    }
  }
}
