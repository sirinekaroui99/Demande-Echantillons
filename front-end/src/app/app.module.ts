import { ProductListComponent } from './product/product-list/product-list.component';
import { AfficherDemandeComponent } from './Demande/afficher-demande/afficher-demande.component';
import { ListeDemandesValiderComponent } from './Demande/liste-demandes-valider/liste-demandes-valider.component';

import { UsersComponent } from './users/users.component';
import { ValiderDemandeComponent } from './Demande/valider-demande/valider-demande.component';
import { SuiviDemandeComponent } from './Demande/suivi-demande/suivi-demande.component';
import { Produit5Component } from './Demande/produit5/produit5.component';
import { Produit4Component } from './Demande/produit4/produit4.component';
import { Produit3Component } from './Demande/produit3/produit3.component';
import { Produit2Component } from './Demande/produit2/produit2.component';
import { Produit1Component } from './Demande/produit1/produit1.component';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { MessageComponent } from './message/message.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { BackendLayoutComponent } from './layouts/backend-layout/backend-layout.component';
import { httpInterceptorProviders } from './http-interceptors';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import { MatTableModule} from '@angular/material/table';
import {  MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatGridListModule} from '@angular/material/grid-list';
import {  MatCardModule} from '@angular/material/card';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'




import { MatStepperModule } from '@angular/material/stepper'

import {ToastrModule} from "ngx-toastr";


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { CreateDemandeComponent } from './Demande/create-demande/create-demande.component';
import { ListeDemandeComponent } from './Demande/liste-demande/liste-demande.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AfficheCertificatComponent } from './affiche-certificat/affiche-certificat.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserOublierComponent } from './user-oublier/user-oublier.component';
import { DashComponent } from './dash/dash.component';





@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    DefaultLayoutComponent,
    BackendLayoutComponent,
    CreateProductComponent,
    CreateDemandeComponent,
    ListeDemandeComponent,
    SuiviDemandeComponent,
    UsersComponent,
    ListeDemandesValiderComponent,
    SignupComponent,
    AfficherDemandeComponent,
    Produit1Component,
    Produit2Component,
    Produit3Component,
    Produit4Component,
    ValiderDemandeComponent,
    Produit5Component,
    UsersListComponent,
    AfficheCertificatComponent,
    UserOublierComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  
    LayoutModule,
    HttpClientModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatStepperModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    SharedModule,
    
    ToastrModule.forRoot(),
    
    FormsModule,
    
    MatSelectModule 
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    httpInterceptorProviders
  ],
  schemas : [ CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
