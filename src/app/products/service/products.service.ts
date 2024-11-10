import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  allProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private httpClient:HttpClient) {
   }

baseURL:string = "http://localhost/onlineStore/api/products";

getStoreProducts(storeId:number):Observable<void>{
  return this.httpClient.get<Product[]>(`${this.baseURL}/${storeId}`).pipe(map((data)=>{
    this.allProducts.next(data);
  }));
}

createNewProduct(prduct:Product):Observable<{message:string,status:string}>{
 return this.httpClient.post<{message:string,status:string}>(`${this.baseURL}`,prduct);
}

editProduct(productName:string, product:Product){
return this.httpClient.put(`${this.baseURL}/${productName}`,product)
}

deleteProduct(productName:string,storeId:number){
  return this.httpClient.delete(`${this.baseURL}/${productName}/${storeId}`)
  }

}
