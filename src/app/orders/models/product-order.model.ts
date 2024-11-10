import { Product } from "../../products/model/product.model";

export interface ProductOrder {
    productId: number;
    quantity: number;
    price: number;
    product:Product;
  }