import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product.model';
import { AutheticationService } from '../../../login/service/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  productAlreadyExist:boolean=false;

  @ViewChild('productModal') modal!:ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef<HTMLButtonElement>;

  constructor(private productService: ProductsService, private authService: AutheticationService,private router:Router) { }

  submit() {
    let storeId = this.authService.getStoreId();
    if (storeId) {
      let product: Product = {
        name: this.productForm.controls['name'].value.trim(),
        description: this.productForm.controls['description'].value.trim(),
        price: this.productForm.controls['price'].value,
        stockLevel: this.productForm.controls['stockLevel'].value,
        storeId: parseInt(storeId),
        code: ''
      }
      this.productService.createNewProduct(product).subscribe({
        next: (data) => {
          let newProduct: Product = {
            name: product.name,
            code: data.message,
            description: product.description,
            price: product.price,
            stockLevel: product.stockLevel,
            storeId: product.storeId
          }
          let oldProducts= this.productService.allProducts.getValue();
          this.productService.allProducts.next([...oldProducts,newProduct]);
         this.closeButton.nativeElement.click();
        },
        error:()=> {
          this.productAlreadyExist=true;
          setTimeout(() => {
            this.productAlreadyExist = false;
          }, 3000);
        }     
      })
    }
  }
  productForm!: FormGroup;


  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = new FormGroup({
      "name": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "price": new FormControl('', [Validators.required]),
      "stockLevel": new FormControl('', [Validators.required]),
    });
  }
}
