import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
allOrders: BehaviorSubject<Order[]>= new BehaviorSubject<Order[]>([]);
  constructor(private httpClinet:HttpClient) { }
baseUrl:string="http://localhost/onlineStore/api/orders"


getStoreOrders(storeId:number):Observable<void>{
  return this.httpClinet.get<Order[]>(`${this.baseUrl}/${storeId}`).pipe(map((data) => {
    this.allOrders.next(data);
  }));
}

createStoreOrder(order:Order):Observable<{message:string,status:string}>{
  return this.httpClinet.post<{message:string,status:string}>(`${this.baseUrl}`, order);
}

editOrderStatus(orderCode:string,newStatus:string):Observable<{message:string,status:string}>{
  return this.httpClinet.put<{message:string,status:string}>(`${this.baseUrl}/${orderCode}?status=${newStatus}`,null);
}

deleteOrderStatus(orderCode:string):Observable<{message:string,status:string}>{
  return this.httpClinet.delete<{message:string,status:string}>(`${this.baseUrl}/${orderCode}`);
}

}
