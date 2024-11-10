import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/page/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/pages/users/users.component';
import { AddUserComponent } from './users/components/add-user/add-user.component';
import { ProductsComponent } from './products/pages/products.component';
import { OrdersComponent } from './orders/pages/orders.component';
import { NewProductComponent } from './products/components/new-product/new-product.component';
import { HttpRequestInterceptorService } from './request-interceptor/request-interceptor.service';
import { EditProductComponent } from './products/components/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/components/delete-product/delete-product.component';
import { NewOrderComponent } from './orders/components/new-order/new-order.component';
import { ProductsDashboardComponent } from './dashboard/components/products-dashboard/products-dashboard.component';
import { OrdersDashboardComponent } from './dashboard/components/orders-dashboard/orders-dashboard.component';
import { ManageOrderComponent } from './orders/components/manage-order/manage-order.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UsersComponent,
    AddUserComponent,
    ProductsComponent,
    OrdersComponent,
    NewProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    NewOrderComponent,
    ProductsDashboardComponent,
    OrdersDashboardComponent,
    ManageOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HttpRequestInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
