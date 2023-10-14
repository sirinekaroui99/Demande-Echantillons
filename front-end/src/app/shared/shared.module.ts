import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { CreateDemandeComponent } from './../Demande/create-demande/create-demande.component';
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';
import { ValiderDemandeComponent } from './../Demande/valider-demande/valider-demande.component';
import { ProductListComponent } from './../product/product-list/product-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BackendHeaderComponent } from './backend-header/backend-header.component';
import { BackendFooterComponent } from './backend-footer/backend-footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatList, MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule, MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HomeDashboardComponent } from '../home-dashboard/home-dashboard.component';
import {DashComponent} from '../dash/dash.component';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  { path: '', component: DashboardComponent}
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BackendHeaderComponent,
    BackendFooterComponent,
    ProductListComponent,

    DashboardComponent,
    DashComponent,
   HomeDashboardComponent,
   
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BackendHeaderComponent,
    BackendFooterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule, 
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class SharedModule { }
