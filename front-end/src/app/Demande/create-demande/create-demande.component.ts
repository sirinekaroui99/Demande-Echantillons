import { AuthService } from 'src/app/auth/services/auth.service';
import { Commande, Sections } from './../models/commande';
import { CommandeService } from './../services/commande.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Produit1Component } from '../produit1/produit1.component';
import { Produit2Component } from '../produit2/produit2.component';
import { Produit3Component } from '../produit3/produit3.component';
import { Produit4Component } from '../produit4/produit4.component';
import { Produit5Component } from '../produit5/produit5.component';
import { ProductService } from 'src/app/product/services/product.service';
import { Produit } from 'src/app/product/models/product';

import {ToastrService} from "ngx-toastr";
import { FormGroup } from '@angular/forms'; 
import {  Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrls: ['./create-demande.component.css']
}) 
export class CreateDemandeComponent implements OnInit {

  commandeForm !: FormGroup;
  

  @ViewChild(Produit1Component, {static : true}) fils1 !: Produit1Component; 
  @ViewChild(Produit2Component, {static : true}) fils2 !: Produit2Component;
  @ViewChild(Produit3Component, {static : true}) fils3 !: Produit3Component;  
  @ViewChild(Produit4Component, {static : true}) fils4 !: Produit4Component; 
  @ViewChild(Produit5Component, {static : true}) fils5 !: Produit5Component; 

Product !: Produit ;
  
  produit1 !: string;
  produit2 !:string;
  produit3 !:string;
  produit4 !: string;
  produit5 !:string;

  Num_cmd = new Array();
numero !: number;
section = new Array()
sections!: Sections[]

Time = new Date()

d = new Date();
date = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate();

click2 !: boolean;
click3 !: boolean;
click4 !: boolean;
click5 !: boolean;

nb = 1 ;

options! : Produit[];
  tab = new Array();

  @Output() commande5: Commande = {
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

  images :any;
   user!: any;
    InfCmd : any ;
    Email : any ;
    email !: string;
  
    Mail = new Array();
  
    mail!: string;
      NomPrenom !: string;
      Nom! : string;
      Prenom!: string;
  Form = false ;
    cmd !: Commande;matricule !:string;commandes !: Commande[]   
    mat !: string;
  validmat !: boolean;

  
  produits! : Produit[];
  utilisateur !: User[];
    id!:string;
NameUser!:string;
PrenomUser!:string;
Name1!: string;
Name2!:string;

pdt !: Produit;

ValidForm !: boolean;

upload !: any ;

fileName !: string;
Msg = false;
commentaire !: string;
PdtExiste =false;
qte !: boolean;

  constructor(private commandeService : CommandeService, private produitService : ProductService,
   
    private router: Router,  private http: HttpClient , private toastr: ToastrService, private authService : AuthService) { }

  ngOnInit(): void {
    this.Time.setTime(this.d.getTime())
    this.authService.getInfUser().subscribe(
      result => {
          this.user = result;
          console.log('user',this.user[0].Matricule)
          this.mat = this.user[0].Matricule
          this.NomPrenom = this.user[0].Nom + ' '+this.user[0].Prenom;
          this.email = this.user[0].Email
          
      });

this.commandeService.getNumCmd().subscribe(
  result => {
      this.Num_cmd = result;
      this.numero=this.Num_cmd[0].Num_cmd + 1
  }
)
this.getSections();
this.Produit();
  }

 getSections(){
  this.commandeService.getSections().subscribe(
    result => {
    this.sections = result;
     })
 }

 Produit(){
  this.produitService
  .getProducts()
  .subscribe((data : any)=> {
  this.options = data ;

  });
 }


sendcmd(){
  if(this.Msg == false) {let user ={
    matricule : this.mat, 
    email : this.email,
    name : this.NomPrenom
  };
  this.commandeService.sendCmd(user)
  .subscribe( 
    data => {
      
      let res : any = data;
      console.log('user',this.user)
      console.log (`email envoyé à ${this.mail}${res.messageId}`);
      
    },
    err => {
      console.log(err);
    },
      );
    
  }
  
}

goTodashboard() { 
  this.router.navigateByUrl('/backend/dashboard'); 
}

Insertcommentaire(ev : any){
  this.commentaire = ev.target.value;

}

selectImage(event : any){
 
  if(event.target.files.length > 0){
    const file = event.target.files[0];
    this.fileName = file.name 
    this.images = file;
    }
}

onSubmit(){ 
  const formData = new FormData();
    
      formData.append('file', this.images);

    this.commandeService.sendFile(formData).subscribe(
      (res) => {console.log(res)
    
  },
     
      (err) => console.log(err)
    )
}




createCommande(data: Commande) : any { 
  
 if(data.Produit!= '' && data.Quantite == 0) {
  alert("La quantité du produit ne doit pas être null")
 }else
    
  if(data.Quantite > 2 )
  alert("la quantité du produit doit etre maximum égale 2")
  else{
    if (data.Quantite != 0 && this.ValidForm == true ) {
   
    data.Num_cmd = this.numero; 
    console.log('numero',this.numero)  
    
        this.pdt= JSON.parse(JSON.stringify(data.Produit));
    console.log('dataproduit',this.pdt.Designation);

    data.Produit = this.pdt.Designation;
    if(data.Produit == undefined){
      this.PdtExiste = false
      
    }else{
      this.PdtExiste = true
    }
    

   data.User = this.mat;
   console.log('commande à Creér', data)    

   data.certificat = this.fileName; 
    data.commentaire = this.commentaire;
    
    if(this.PdtExiste == true )
    {
    this.commandeService.addCommande(data).subscribe(
      result => {
        console.log(result);
        if ( result) {
         
          this.sendcmd()
          this.Msg = true;
         this.router.navigateByUrl(`/backend/dashboard/SuiviDemande/${this.Msg}`);
         
        } else {
          
        }
      }
    )}else {
      alert("Produit saisi n'existe pas")
    }
   
    
  } 
  }
    
}



count(){
  this.nb = this.nb+1
  console.log('nb',this.nb)
  
  if(this.nb == 2)
  this.click2 = true
  if(this.nb == 3)
  this.click3 = true;
  if(this.nb == 4)
  this.click4 = true
  if(this.nb == 5)
  this.click5 = true
}


verifProduit(pdt1 : any, pdt2 :any , pdt3 : any, pdt4 : any , pdt5: any) : any{
  
  if(pdt1 == '') {
    alert('Aucun produit choisi !!')
    this.ValidForm = false;
  }
  this.ValidForm = false;
if( (pdt1 != '' && JSON.stringify(pdt1) == JSON.stringify(pdt2)) ||  (pdt1 != '' && JSON.stringify(pdt1) == JSON.stringify(pdt3)) ||  (pdt1 != '' && JSON.stringify(pdt1) == JSON.stringify(pdt3)) || (pdt1 != '' && JSON.stringify(pdt1) == JSON.stringify(pdt4) )||  (pdt1 != '' && JSON.stringify(pdt1) == JSON.stringify(pdt5))){
 alert('Le prémier produit saisi est répété')
}else{
   if( (pdt2 != '' && JSON.stringify(pdt2) == JSON.stringify(pdt3) )|| ( pdt2 != '' &&JSON.stringify(pdt2) == JSON.stringify(pdt4)) || ( pdt2 != '' && JSON.stringify(pdt1) == JSON.stringify(pdt5)))  
 {alert('Le deuxième produit saisi est répété')}
else { if( (pdt3 != '' && JSON.stringify(pdt3) == JSON.stringify(pdt4)) || (pdt3 != '' && JSON.stringify(pdt3) == JSON.stringify(pdt5)))
 {alert('Le troisième produit saisi est répété')
} else {
 if( (pdt4 != '' && JSON.stringify(pdt4) == JSON.stringify(pdt5))){
  alert('Le quatrième produit saisi est répété')
  }else {
    this.ValidForm = true
  
  }  
}
}

}

  this.verifPrdt1(pdt1);
  this.verifPrdt2(pdt2);
  this.verifPrdt3(pdt3);
  this.verifPrdt4(pdt4);
  this.verifPrdt5(pdt5);


}
verifPrdt1(pdt1 : any){

  if(pdt1 != '' && pdt1.Designation != undefined)
  {
    for (var i in this.options){
      if(pdt1.Designation == this.options[i].Designation){
        this.PdtExiste = true;
      }
    }
  }else {
  for(var i in this.options){
    if(pdt1 == this.options[i].Designation){
      this.PdtExiste = true
    }
  }
  }
}

verifPrdt2(pdt2 : any){

  if(pdt2 != '' && pdt2.Designation != undefined)
  {
    for (var i in this.options){
      if(pdt2.Designation == this.options[i].Designation){
        this.PdtExiste = true;
      }
    }
  }else {
  for(var i in this.options){
    if(pdt2 == this.options[i].Designation){
      this.PdtExiste = true
    }
  }
  }
}
verifPrdt3(pdt3 : any){

  if(pdt3 != '' && pdt3.Designation != undefined)
  {
    for (var i in this.options){
      if(pdt3.Designation == this.options[i].Designation){
        this.PdtExiste = true;
      }
    }
  }else {
  for(var i in this.options){
    if(pdt3 == this.options[i].Designation){
      this.PdtExiste = true
    }
  }
  }
}


verifPrdt4(pdt4 : any){

  if(pdt4 != '' && pdt4.Designation != undefined)
  {
    for (var i in this.options){
      if(pdt4.Designation == this.options[i].Designation){
        this.PdtExiste = true;
      }
    }
  }else {
  for(var i in this.options){
    if(pdt4 == this.options[i].Designation){
      this.PdtExiste = true
    }
  }
  }
}


verifPrdt5(pdt5 : any){

  if(pdt5 != '' && pdt5.Designation != undefined)
  {
    for (var i in this.options){
      if(pdt5.Designation == this.options[i].Designation){
        this.PdtExiste = true;
      }
    }
  }else {
  for(var i in this.options){
    if(pdt5 == this.options[i].Designation){
      this.PdtExiste = true
    }
  }
  }
}

}