import { ListeDemandesValiderComponent } from './../Demande/liste-demandes-valider/liste-demandes-valider.component';
import { AfficheCertificatComponent } from './../affiche-certificat/affiche-certificat.component';
import { SuiviDemandeComponent } from './../Demande/suivi-demande/suivi-demande.component';
import { ValiderDemandeComponent } from './../Demande/valider-demande/valider-demande.component';
import { ListeDemandeComponent } from './../Demande/liste-demande/liste-demande.component';
import { ProductListComponent } from './../product/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { CreateDemandeComponent } from '../Demande/create-demande/create-demande.component';
import { UsersComponent } from '../users/users.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { CreateProductComponent } from '../product/create-product/create-product.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AfficherDemandeComponent } from '../Demande/afficher-demande/afficher-demande.component';

const routes: Routes = [
  { 
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  
  { path: 'signup', component: SignupComponent },
  { path : 'produit' , component : ProductListComponent },
  { path: 'createDemande', component: CreateDemandeComponent},
  { path: 'listeDemandes', component:ListeDemandeComponent },
  { path: 'validerDemande',  component:ValiderDemandeComponent },
  { path:'SuiviDemande' , component:SuiviDemandeComponent},
  { path:'gererUtilisateur', component:UsersComponent},
  { path:'listeUtilisateur',component:UsersListComponent },
  { path:'listeUtilisateur/:Msg',component:UsersListComponent },
  
  { path:'SuiviDemande/:Msg' , component:SuiviDemandeComponent},
  { path : 'produit/:success' , component : ProductListComponent },
  { path: 'createProduit', component: CreateProductComponent },
  { path:'updateProduit/:Code', component:CreateProductComponent },
  { path:'Certificat/:certificat',component:AfficheCertificatComponent },
  { path: 'Demande/:Num_cmd', component: ValiderDemandeComponent },
  { path:'DemandeValidé',component:ListeDemandesValiderComponent },
  
  { path: 'AfficherDemande/:num', component:AfficherDemandeComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
