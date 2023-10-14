import { AfficherDemandeComponent } from './../Demande/afficher-demande/afficher-demande.component';
import { ListeDemandesValiderComponent } from './../Demande/liste-demandes-valider/liste-demandes-valider.component';
import { UsersListComponent } from './../users-list/users-list.component';
import { UsersComponent } from './../users/users.component';
import { SuiviDemandeComponent } from './../Demande/suivi-demande/suivi-demande.component';
import { ValiderDemandeComponent } from './../Demande/valider-demande/valider-demande.component';
import { ListeDemandeComponent } from './../Demande/liste-demande/liste-demande.component';

import { CreateProductComponent } from './../product/create-product/create-product.component';
import { ProductListComponent } from './../product/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDemandeComponent } from '../Demande/create-demande/create-demande.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { SignupComponent } from '../auth/signup/signup.component';

const routes: Routes = [
  
  {path : '' ,redirectTo:'/backend/dashboard', pathMatch:'full'},

  
  { path: 'dashboard/signup', component: SignupComponent },
  { path : 'dashboard/produit' , component : ProductListComponent },
  { path : 'dashboard/produit/:success' , component : ProductListComponent },
  { path: 'dashboard/createDemande', component: CreateDemandeComponent},
  { path: 'dashboard/listeDemandes', component:ListeDemandeComponent },
  { path: 'dashboard/validerDemande',  component:ValiderDemandeComponent },
  { path:'dashboard/SuiviDemande' , component:SuiviDemandeComponent},
  
  { path:'dashboard/SuiviDemande/:Msg' , component:SuiviDemandeComponent},
  { path:'dashboard/gererUtilisateur', component:UsersComponent},
  { path:'dashboard/listeUtilisateur',component:UsersListComponent },
  { path:'dashboard/updateProduit/:Code', component:CreateProductComponent },
  
  { path: 'dashboard/Demande/:Num_cmd', component: ValiderDemandeComponent },
  { path: 'dashboard/DemandeValidé', component:ListeDemandesValiderComponent},
  { path: 'dashboard/AfficherDemande/:num', component:AfficherDemandeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SharedRoutingModule { }
