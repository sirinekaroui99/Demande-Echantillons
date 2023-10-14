import { CreateDemandeComponent } from './create-demande/create-demande.component';
import { ValiderDemandeComponent } from './valider-demande/valider-demande.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ListeDemandeComponent } from './liste-demande/liste-demande.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'Liste',
        component: ListeDemandeComponent
      },
      {
        path : 'Demande',
        component : ValiderDemandeComponent
      },
      {
        path: 'upload',
        component: CreateDemandeComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }

