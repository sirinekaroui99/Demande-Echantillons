import { AuthService } from 'src/app/auth/services/auth.service';
import { Commande } from './../models/commande';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-afficher-demande',
  templateUrl: './afficher-demande.component.html',
  styleUrls: ['./afficher-demande.component.css']
})
export class AfficherDemandeComponent implements OnInit {
Numcmd !: any;
  User : any;
utilisateur !: User[]
QuantiteUpdate :any
ProduitUpdate : any; 
ValidQuantite !: boolean;
ValidProduit !: boolean;
commentaire !: string;
cmntr =false ;
commandes !: Commande[]

qte : any
pdt : any;
index : any;
certificat !: string;
image = false;

Num_cmd = new Array();
numero!: number;
Matricule! : string;
id = new Array();
Nom! : string;
Prenom! : string;
Section! : string;
date =new Date()
produit!: string;
email! : string;

  constructor(private commandeService: CommandeService,
    private route: ActivatedRoute,private authService  : AuthService,
    private router: Router) { }

  ngOnInit(): void { 
    this.Numcmd = this.route.snapshot.paramMap.get('num');
 
  this.getCommande();
 
}


getCommande(){
 
    return this.commandeService.getCommande(this.Numcmd).subscribe(
      result => {

        for(var i in result)
       {
          this.commandes = result;
       } 
       this.commentaire = this.commandes[0].commentaire
       if(this.commentaire != null)
       {
         this.cmntr = true
       }
       this.numero = this.commandes[0].Num_cmd;
        console.log('numero',this.numero)
            this.Matricule=this.commandes[0].User; 
            this.certificat=this.commandes[0].certificat;
            if(this.certificat != null)
 {
   this.image = true;
 }
             this.numero,this.Matricule
          this.date = this.commandes[0].Date_cmd;
return this.authService.getUser(this.Matricule).subscribe(
  result => {
    this.utilisateur = result ;
    this.email = this.utilisateur[0].Email;
    this.Section = this.utilisateur[0].Section;
    this.Nom = this.utilisateur[0].Nom;
    this.Prenom = this.utilisateur[0].Prenom;

    
}
)  }) 
}



print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section')!.innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin!.document.open();
  popupWin!.document.write(`
    <html>
      <head>
        <title></title>
        <style>
        //........Customized style.......
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin!.document.close();
}


printCertificat(){
  this.router.navigateByUrl(`/backend/dashboard/Certificat/${this.certificat}${this.image}`)
}


}
