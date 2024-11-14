import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OrdersService } from '../../service/orders.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-action-order',
  templateUrl: './action-order.component.html',
  styleUrl: './action-order.component.css'
})
export class ActionOrderComponent {
  action: string='';
  newStatus: string='';
  orderToAction!: Order;

  @ViewChild('closeBtn')closeButton!:ElementRef<HTMLButtonElement>
  constructor(private orderService: OrdersService) { }

  confirmAction() {
    if (this.action === 'edit') {
      this.editOrderStatus();
    }
    else if (this.action === 'delete') {
      this.deleteOrderStatus();

    }
  }

  editOrderStatus() {
    this.orderService.editOrderStatus(this.orderToAction.code, this.newStatus.trim()).subscribe({
      next: () => {
        let oldOrders = this.orderService.allOrders.getValue();
        oldOrders.forEach((o) => {
          if (o.code === this.orderToAction.code) {
            o.status = this.newStatus;
          }
        })
        this.orderService.allOrders.next(oldOrders);
        this.closeButton.nativeElement.click();
      }
    })
  }


  deleteOrderStatus() {
    this.orderService.deleteOrderStatus(this.orderToAction.code).subscribe({
      next: () => {
        let oldOrders = this.orderService.allOrders.getValue();
        oldOrders = oldOrders.filter((o) => o.code !== this.orderToAction.code);
        this.orderService.allOrders.next(oldOrders);
        this.closeButton.nativeElement.click();
      }
    })
  }



}
