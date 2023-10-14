
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Commande } from '../models/commande';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-liste-demandes-valider',
  templateUrl: './liste-demandes-valider.component.html',
  styleUrls: ['./liste-demandes-valider.component.css']
})
export class ListeDemandesValiderComponent implements OnInit {
imprimer = false;
cmd : Commande = {
  Num_cmd : 0,
  Date_cmd : new Date(),
  Produit : '',
  Quantite : 0,
  User : '',
  status : '',
  certificat : '',
  commentaire : '',
  rejet : '',
};
commandes !: Commande[]
user !: User[];
Matricule !: any;

  constructor( private commandeService :CommandeService, private router: Router,private authService:AuthService,) { }
  
  ngOnInit(): void {
this.getValidCmd()
  }


  getValidCmd() 
   {this.authService.getInfUser().subscribe(
    result => {
        this.user = result;
        console.log('user',this.user[0].Matricule)
      this.commandeService.getValidCmd(this.user[0].Matricule).subscribe(
      result => {
          this.commandes = result;
          console.log(this.commandes);
          
      }
    )
     
    }
  )
  }

  goToAfficherCmd(num : number){
    this.router.navigateByUrl(`/backend/dashboard/AfficherDemande/${num}`); 
  }

  

}
