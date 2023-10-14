import { AuthService } from './../../auth/services/auth.service';
import { CommandeService } from './../services/commande.service';
import { Component, OnInit } from '@angular/core';
import { Commande } from '../models/commande';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.css']
})
export class ListeDemandeComponent implements OnInit {
  commandes !: Commande[]
  
nb =' ';
Vide !: boolean;
user !: User[];

  constructor( private commandeService :CommandeService, private router: Router,private authService : AuthService) { }

  ngOnInit(): void {
    this.getCommandes();

    this.authService.getInfUser().subscribe(
      result => {
          this.user = result;
          
      }
    )

  }
  getCommandes() {
    this.commandeService.getCommandes().subscribe(
      result => {
          this.commandes = result;
          this.commandes.splice(0,1)
          console.log('commandes',this.commandes)
        
      }
    )



  }
  goToValiderCmd(Num_cmd :any) {
    this.router.navigateByUrl(`/backend/dashboard/Demande/${Num_cmd}`); 
  }

  search(ev :any){

    console.log('ffff',ev.target.value,'b')

if(ev.target.value!= this.nb){
 this.nb = ev.target.value
 this.commandeService.getCmd(this.user[0].Matricule).subscribe(
   result => {
       this.commandes = result;
       this.commandes = this.commandes.filter(
         Commande => Commande.Num_cmd == ev.target.value);

 
         
       if(JSON.stringify(this.commandes) == JSON.stringify([]))
       {
            this.Vide = true;
       }else{
         this.Vide = false;
       }
       });
   
}
if(ev.target.value == '')
{
 this.commandeService.getCmd(this.user[0].Matricule).subscribe(
   result => {
       this.commandes = result;
        
});
}
}
}
