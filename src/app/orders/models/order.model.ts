import { ProductOrder } from "./product-order.model";

  
  export interface Order{
    code: string;
    totalQuantity: number;
    totalPrice: number;
    shippingAddress: string;
    paymentMethod: string;
    customerDetails: string;
    status: string;
    storeId: number;
    order: { [k: string]: number; };  
    products?: ProductOrder[];  
  }
  