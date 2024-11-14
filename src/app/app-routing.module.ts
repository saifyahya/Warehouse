import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/pages/users/users.component';
import { LoginComponent } from './login/page/login.component';
import { ProductsComponent } from './products/pages/products.component';
import { OrdersComponent } from './orders/pages/orders.component';
import { ProductsDashboardComponent } from './dashboard/components/products-dashboard/products-dashboard.component';
import { OrdersDashboardComponent } from './dashboard/components/orders-dashboard/orders-dashboard.component';
import { ManageOrderComponent } from './orders/components/manage-order/manage-order.component';
import { WarehouseComponent } from './warehouses/pages/warehouse/warehouse.component';
import { LoginActivateService } from './guard/login.guard';
import { ActivateRoutesService } from './guard/auth.guard';
import { EmplyeeActivateRoutesService } from './guard/employee.guard';
import { ManagerActivateRoutesService } from './guard/manager.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ActivateRoutesService, ManagerActivateRoutesService,]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginActivateService]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [ActivateRoutesService, EmplyeeActivateRoutesService]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [ActivateRoutesService, EmplyeeActivateRoutesService]
  },
  {
    path: 'dashboard-products',
    component: ProductsDashboardComponent,
    canActivate: [ActivateRoutesService, ManagerActivateRoutesService]

  },
  {
    path: 'dashboard-orders',
    component: OrdersDashboardComponent,
    canActivate: [ActivateRoutesService, ManagerActivateRoutesService]

  },
  {
    path: 'manage-order',
    component: ManageOrderComponent,
    canActivate: [ActivateRoutesService, EmplyeeActivateRoutesService]
  },
  {
    path: 'warehouses',
    component: WarehouseComponent,
    canActivate: [ActivateRoutesService, ManagerActivateRoutesService]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
