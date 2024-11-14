import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../../service/warehouse.service';
import { Warehouse } from '../../model/warehouse.model';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrl: './new-warehouse.component.css'
})
export class NewWarehouseComponent {
warehouseForm: FormGroup= new FormGroup({
  "capacity": new FormControl('',[Validators.required,Validators.min(10)]),
  "location": new FormControl('',[Validators.required]),
});

@ViewChild('closeButton')closeButton!:ElementRef<HTMLButtonElement>;
constructor(private warehouseService:WarehouseService){}

createWarehouse(){
  let warehouse:Warehouse={
    location:this.warehouseForm.controls['location'].value.trim(),
    capacity:this.warehouseForm.controls['capacity'].value,
    isActive:true
  }
this.warehouseService.createNewWarehouse(warehouse).subscribe({
  next:(data)=>{

    this.warehouseService.getAllWarehoues().subscribe();
    this.closeButton.nativeElement.click();
  }
})
}
}
