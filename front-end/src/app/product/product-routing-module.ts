import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateDemandeComponent } from '../Demande/create-demande/create-demande.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    
  },
  {path : '' , component : DashboardComponent},
  { path : 'produit' , component : ProductListComponent },
  { path : 'produit/:success' , component : ProductListComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ToastrModule.forRoot()],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

