import { Order } from "../../orders/models/order.model";
import { Product } from "../../products/model/product.model";

export interface Store{
    location:string;
    capacity:number;
    isActive:boolean;
    products?:Product[];
    orders?:Order[];
    id?:number

}