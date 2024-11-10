export interface Product {
    name: string;
    description: string;
    price: number;
    stockLevel: number;
    storeId: number;
    code?:string;
    orderQuantity?:number;
  }
  