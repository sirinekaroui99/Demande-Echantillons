import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from './../models/commande';
import { CommandeService } from './../services/commande.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';

@Component({
  selector: 'app-suivi-demande',
  templateUrl: './suivi-demande.component.html',
  styleUrls: ['./suivi-demande.component.css']
})
export class SuiviDemandeComponent implements OnInit {
  searchText ='';
  user !: User[];
  Matricule !: any;
commandes !: Commande[]
cmdd !: Commande[]
Status !: string;
imprimer !: boolean;
Msg !: any;
toast !: boolean;
cmd !: boolean
image = false;

  valid !: boolean;
  nb =' ';
  Vide !: boolean;
  constructor(private authService:AuthService, private commandeService:CommandeService,private route : ActivatedRoute,private router: Router
   ) { }

  ngOnInit(): void {
    
    this.Msg = this.route.snapshot.paramMap.get('Msg');
    

    this.authService.getInfUser().subscribe(
      result => {
          this.user = result;
          console.log('user',this.user[0].Matricule)
        this.commandeService.getCmd(this.user[0].Matricule).subscribe(
        result => {
            this.commandes = result;
            this.Status = this.commandes[0].status;
          
            for(var i in this.commandes)
            {
              if(this.commandes[i].certificat != null ){
              this.image=true
            }else{
              this.image=false
              
            }
            }
            
        }
      )
       
      }
    )
     

  }

  

click(num : any, commande : Commande){
  
   console.log('cert',this.image)
  console.log('event',num)
  this.commandes.splice(5,1)
  //this.commandes.push(this.cccc)
 // this.commandes.splice(num-2,0,this.commandes[1])
  this.commandeService.getCommande(num).subscribe( 
    result => {
      this.cmd = true;
      
      this.cmdd=result;
     
      
        console.log('hjhjhj',num)
        this.commandes = this.commandes.filter(
        Commande => Commande.Num_cmd == num);
      
      
      
    }
  )
}
goToAfficherCmd(num : number){
  this.router.navigateByUrl(`/backend/dashboard/AfficherDemande/${num}`); 
}

splice(num : any){
}
AfficherImage(certificat : any){
  this.router.navigateByUrl(`/backend/dashboard/Certificat/${certificat}`)
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


 
 clear(){
  this.cmd = false;
  this.commandeService.getCmd(this.user[0].Matricule).subscribe(
    result => {
        this.commandes = result;
    });
}
}
