import { Commande } from './../models/commande';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product/services/product.service';
import { CommandeService } from '../services/commande.service';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-valider-demande',
  templateUrl: './valider-demande.component.html',
  styleUrls: ['./valider-demande.component.css']
})
export class ValiderDemandeComponent implements OnInit {

  mois !: number;
  var0 = 0;
  var1 = 0;
  var2 = 0;
  var3 = 0;
  var4 = 0;
  var5 = 0;
  var6 = 0;
  var7 = 0;
  var8 = 0;
  var9 = 0;
  var10 = 0;
  var11 = 0;
  var12 = 0;



Numcmd : any;

CommandeForm !: FormGroup;

commandes!: Commande[];
valid = false;

@Input() cmd: Commande = {
  Num_cmd : 0,
  Date_cmd : new Date(),
  Produit : '',
  Quantite : 0,
  User : '',
  status : '',
  certificat : '',
  commentaire : '',
  rejet :'',
};

Valid = false;

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

status! : string;

cmdSuppr : Commande = {
Num_cmd : 0,
Date_cmd : new Date(),
Produit : '',
Quantite : 0,
User : '',
status : '',
certificat :'',
commentaire : '',
rejet : '',
};

User : any;
utilisateur !: User[]
QuantiteUpdate :any
ProduitUpdate : any; 
ValidQuantite !: boolean;
ValidProduit !: boolean;
commentaire !: string;
cmntr =false ;
rejet : any;

zero = false;
one = false;
two=false;
three=false;
four=false;
modifier0 = false;
modifier1 = false;
modifier2 = false;
modifier3 = false;
modifier4 = false;

qte : any
pdt : any;
index : any;
certificat !: string;
image = false;
envoyer = false;

d = new Date();
currentDate = (this.d.getMonth()+1);
nbr0 = false;
nbr1 = false;
nbr2 = false;
nbr3 = false;
nbr4 = false;
nbr5 = false;
nbr6 = false;
nbr7 = false;
nbr8 = false;
nbr9 = false;
nbr10 = false;
nbr11= false;
nbr12= false;


  constructor(private authService : AuthService,
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    
    this.Numcmd = this.route.snapshot.paramMap.get('Num_cmd');
    this.getCommande();
  }

  
  
  getCommande(){
   
      return this.commandeService.getCommande(this.Numcmd).subscribe(
        result => {

          for(var i in result)
         {
            this.commandes = result;
         } 
         if(this.commandes[0].status == 'Validée')
         {
          this.Valid = true
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
  

 
  deleteCommande(data : Commande){
    if(confirm('Voulez-vous vraiement supprimer ce ligne de demande?'))
    {
      this.cmdSuppr=data;
   var id = this.commandes.indexOf(data);
   delete this.commandes[id] 
   this.commandes.splice(id,1)
  this.commandeService.deleteCmd(data.User,data.Produit,data.Quantite,data.Num_cmd) 
  .subscribe(
    (res) => {console.log('delete',res) 
    alert('Succès : La ligne de demande a été supprimer')
  },   
    (err) => console.log(err)
  );
    }
    
}
goToListe(){
 this.status= 'Refuse';
  this.router.navigateByUrl('/backend/dashboard/listeDemandes')
}


ChangeQuantite(ev : any,qte0 : any ,pdt : any,num : number,i : any){
 if(ev.target.value > 0 && ev.target.value <=2){
  this.ValidQuantite=true;
  console.log(ev.target.value)
  this.QuantiteUpdate = ev.target.value
  this.commandeService.updateCmdQte(qte0,this.QuantiteUpdate,pdt,num)
  .subscribe(
    result => {
      console.log(result);
      if ( result) {
        if(i == 0) {
          this.zero = true;
          this.modifier0 = true
        }
        if(i == 1) {
          this.one = true;
          this.modifier1 = true
        }
        if(i == 2) {
          this.two = true;
          this.modifier2 = true
        }
        if(i == 3) {
          this.three = true;
          this.modifier3 = true
        }
        if(i == 4) {
          this.four = true;
          this.modifier4 = true
        }
        console.log('res',result)
        alert("Quantité produit modifié avec succès")
       // this.router.navigateByUrl('/backend/dashboard/listeDemandes');
      } else {
        alert("Erreur de modification")
      }
    })
 }else{
   alert("La quantité doit au maximum = 2")
   this.getCommande();
 }
  

}

ChangeProduit(ev: any,pdt : any,num : number,i : any){
  console.log('indexxxxxxxxxxx',i)
  console.log('pdt',pdt)
  this.pdt = pdt;
  this.ValidProduit=true;
  this.ProduitUpdate = ev.target.value
  console.log('pdtUpdate',this.ProduitUpdate)
  this.commandeService.updateCmdPdt(this.ProduitUpdate,pdt,num)
  .subscribe(
    result => {
      
      console.log(result);
      if ( result) {
        console.log('res',result)
        alert("Produit modifié avec succès")
       // this.router.navigateByUrl('/backend/dashboard/listeDemandes');
      } else {
        alert("Erreur de modification")
      }
    })
}



sendValidMail(){
  
  if(confirm('Êtes vous sûr de valider cette demande')){
    this.status = 'Valide'; 
    if(this.envoyer == false){
      console.log('status',this.status)
      let user ={
        matricule : this.Matricule, 
        email : this.email,
        name : this.Prenom +' ' +this.Nom
      };
      console.log('user',user.email)
      this.commandeService.sendValidCmd(user)
      .subscribe( 
        data => {
          
          let res : any = data;
          
          this.envoyer = true
          
           console.log (`email envoyé à ${this.email}${res.messageId}`);
    
        },
        err => {
          console.log(err);
        },
          );
         
  }
  
}

  }

  sendRefusMail(){
    this.rejet = prompt('Remplir la raison de refus')
    if(this.rejet){
      this.status= 'Refuse';
  if(this.envoyer == false) {
    let user ={
      matricule : this.Matricule, 
      email : this.email,
      name : this.Prenom +' ' +this.Nom
    };
    console.log('user',user.email)
    this.commandeService.sendRefusCmd(user)
    .subscribe( 
      data => {
        
        let res : any = data;
        
        this.envoyer = true;
        
         console.log (`email envoyé à ${this.email}${res.messageId}`);
  
      },
      err => {
        console.log(err);
      },
        );
       
  }
    }
  
        
      }


 
 updateCommande() : any{
   console.log('status',this.status);
   // console.log('hjhjjj',this.commandes) 
   if(JSON.stringify(this.commandes) == JSON.stringify([]))
   {
    alert("Lignes de commandes vide");
   }else{
     for(var i in this.commandes)
  
  if(this.status=='Refuse')
  { 
   {this.commandes[i].status = 'Refusée';
   this.commandes[i].rejet = this.rejet;
  this.valid=false
   return this.commandeService.updateCommande(this.commandes[i]).subscribe(
    result => {
      console.log(result);
      if ( result) {
        
        this.router.navigateByUrl('/backend/dashboard/listeDemandes');
      } else {
      }
    })} 
  }
 else{
   
  if(this.status == 'Valide')
  {
    
    {this.commandes[i].status = 'Validée';
    
      return this.commandeService.updateCommande(this.commandes[i]).subscribe(
   result => {
     console.log(result); 
     if ( result) {
       this.router.navigateByUrl('/backend/dashboard/listeDemandes');
       
     
     } else {
       console.log('errrrrrrrrrrrrrrrr')
     }
   })
    
 }
 }
   }
   }
  
 }
 
  
 AfficherImage(){
     
  this.router.navigateByUrl(`/backend/dashboard/Certificat/${this.certificat}`)
 }

 verif(){ 
  this.var1 = 0;
  this.var2 = 0;
  this.var3 = 0;
  this.var4 = 0;
  this.var5 = 0;
  this.var6 = 0;
  this.var7 = 0;
  this.var8 = 0;
  this.var9 = 0;
  this.var10 = 0;
  this.var11 = 0;
  this.var12 = 0;
  this.commandeService.getCmd(this.Matricule).subscribe(
    result => {
     console.log('ressss',result)
      for(var i in result) {
        this.date = new Date(result[i].Date_cmd)
                  console.log('date',this.date.getMonth()+1)
                  this.mois = this.date.getMonth()+1
                  
      if(this.mois == 1 && this.mois== this.currentDate)
      {
        this.var1 = this.var1 + 1
        this.nbr1 = true
      }
      if(this.mois == 2 && this.mois== this.currentDate)
      {
        this.var2 = this.var2 + 1;
        this.nbr2 = true
      }
      if(this.mois == 3 && this.mois== this.currentDate)
      {
        this.var3 = this.var3 + 1 
        this.nbr3 = true
      }
      if(this.mois == 4  && this.mois== this.currentDate)
      {
        this.var4 = this.var4 + 1 ;
        this.nbr4 = true
      }
      if(this.mois == 5  && this.mois== this.currentDate)
      {
        this.var5 = this.var5 + 1 
        this.nbr5 = true
      }
      if(this.mois == 6 && this.mois== this.currentDate)
      {
        this.var6 = this.var6 + 1;
        this.nbr6 = true
      }
      if(this.mois == 7 && this.mois== this.currentDate){
        this.var7 = this.var7 + 1
        this.nbr7 = true
      }
      if(this.mois == 8 && this.mois== this.currentDate)
      {
        this.var8 = this.var8 +1 
        this.nbr8 = true
      }
      if(this.mois == 9 && this.mois== this.currentDate)
      {
        this.var9 = this.var9 +1
        this.nbr9 = true
      }
      if(this.mois == 10 && this.mois== this.currentDate)
      {
        this.var10 = this.var10 + 1;
        this.nbr10 = true
      }
      if(this.mois == 11 && this.mois== this.currentDate)
      {
        this.var11 = this.var11 +1;
        this.nbr11 = true
      }
      if(this.mois == 12 && this.mois== this.currentDate)
      {
        this.var12 = this.var12 +1 ;
        this.nbr12 = true
      } 
      
      }
    }
  )

}

}
