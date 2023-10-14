import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing-module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [CreateProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule

    
  ]
})
export class ProductModule { }

