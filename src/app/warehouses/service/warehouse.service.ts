import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Warehouse } from '../model/warehouse.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  allWarehouses: BehaviorSubject<Warehouse[]> = new BehaviorSubject<Warehouse[]>([]);
  baseURL:string = "http://localhost/onlineStore/api/stores";

  constructor(private httpClient:HttpClient) {
  }

  getAllWarehoues():Observable<void>{
    return this.httpClient.get<Warehouse[]>(`${this.baseURL}`).pipe(map((data)=>{
      this.allWarehouses.next(data);
    }));
  }

  getNewWarehoues():Observable<Warehouse[]>{
    return this.httpClient.get<Warehouse[]>(`${this.baseURL}/empty`);
  }

  createNewWarehouse(warehouse:Warehouse):Observable<{message:string,status:string}>{
    return this.httpClient.post<{message:string,status:string}>(`${this.baseURL}`,warehouse);
   }

   getEmployeeWraehouse(warehouseId:number) {
    return this.httpClient.get<Warehouse>(`${this.baseURL}/${warehouseId}`);

   }

}
