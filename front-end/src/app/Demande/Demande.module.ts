import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDemandeComponent } from './create-demande/create-demande.component';
import { ListeDemandeComponent } from './liste-demande/liste-demande.component';
import { DemandeRoutingModule } from './Demande-routing-module';
import { Produit1Component } from './produit1/produit1.component';
import { Produit2Component } from './produit2/produit2.component';
import { Produit3Component } from './produit3/produit3.component';
import { Produit4Component } from './produit4/produit4.component';
import { Produit5Component } from './produit5/produit5.component';
import { ValiderDemandeComponent } from './valider-demande/valider-demande.component';
import { BrowserModule } from '@angular/platform-browser';
import { SuiviDemandeComponent } from './suivi-demande/suivi-demande.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ListeDemandesValiderComponent } from './liste-demandes-valider/liste-demandes-valider.component';
import { AfficherDemandeComponent } from './afficher-demande/afficher-demande.component';


@NgModule({
  declarations: [CreateDemandeComponent, ListeDemandeComponent, Produit1Component, Produit2Component, Produit3Component, Produit4Component, Produit5Component, ValiderDemandeComponent, SuiviDemandeComponent, ListeDemandesValiderComponent, AfficherDemandeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemandeRoutingModule,
    FilterPipeModule,
    ToastrService,
    BrowserModule,
    DashboardComponent,
    ToastrModule.forRoot(),

    
  ]
})
export class DemandeModule { }

