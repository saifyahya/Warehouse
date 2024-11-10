import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/pages/users/users.component';
import { LoginComponent } from './login/page/login.component';
import { ProductsComponent } from './products/pages/products.component';
import { OrdersComponent } from './orders/pages/orders.component';
import { ProductsDashboardComponent } from './dashboard/components/products-dashboard/products-dashboard.component';
import { OrdersDashboardComponent } from './dashboard/components/orders-dashboard/orders-dashboard.component';
import { ManageOrderComponent } from './orders/components/manage-order/manage-order.component';

const routes: Routes = [
{path:'users',
  component:UsersComponent
},
{path:'login',
  component:LoginComponent
},
{
  path:'products',
  component:ProductsComponent
},
{
  path:'orders',
  component:OrdersComponent
},
{path:'dashboard-products',
  component:ProductsDashboardComponent
},
{path:'dashboard-orders',
  component:OrdersDashboardComponent
},
{path:'manage-order',
  component:ManageOrderComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
