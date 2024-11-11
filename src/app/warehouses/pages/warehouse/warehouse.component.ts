import { Component } from '@angular/core';
import { Warehouse } from '../../model/warehouse.model';
import { WarehouseService } from '../../service/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent {
  allWarehoues: Warehouse[] = [];

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit() {
    this.getWarehouses();
    this.subscribeToServiceData();
  }

  getWarehouses() {
    this.warehouseService.getAllWarehoues().subscribe();
  }

  subscribeToServiceData() {
    this.warehouseService.allWarehouses.subscribe((data) => {
      if (data !== null) {
        this.allWarehoues = data;
        console.log(data);
        
      }
    })
  }
}
