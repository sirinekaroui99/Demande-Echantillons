import { CommandeService } from './../Demande/services/commande.service';
import { utilisateur } from './../auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Sections } from '../Demande/models/commande';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  password !: any;
  pass  = true;
  confpass !: boolean;
  Actualpassword !: string;
  NouveauPass !: string;
  ConfNouveauPass !: string;
  section !: boolean;
  NvSection !: any ;
  AncienSection !: any
  Email !: boolean;
  NvEmail !: any;
  AncienEmail !: any
  Matricule !: number;

  utilisateur : utilisateur = {
   Matricule : 0,
   Email : '',
   Section : '',
   password : '',
   is_active : true,

  };

  sections!: Sections[]
  validMail !: boolean
  Emailval :any;
  constructor(    private authService : AuthService,  private router: Router, private commandeService : CommandeService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getSections()
  }

  getSections(){
    this.commandeService.getSections().subscribe(
      result => {
      this.sections = result;
       })
   }

  getUsers() {
    this.authService.getInfUser().subscribe(
      result => {
        this.users = result;
        this.Matricule = result[0].Matricule;
        this.password = result[0].password
        this.AncienEmail = result[0].Email;
        this.AncienSection = result[0].Section;
        this.Actualpassword = result[0].password;
     //   console.log('userrr',this.users,result[0].password)
       
      },
      err => console.log(err)
    )
    
  }

  ChangeSection(ev : any){
    this.section = true;
    this.NvSection = ev.value;

  }

  ChangeEmail(ev : any){
    this.Emailval = ev.target.value
console.log('email',ev.target.value)
    var index = ev.target.value.indexOf("@");    
    if(index !== -1){
      this.validMail = true;
      this.Email = true;
      this.NvEmail = ev.target.value;
    } else{
this.validMail = false;
        alert("adresse email invalide!");
    }
  }
 

ChangePassword(ev : any){ 

  if(ev.target.value != ' '){
    if((ev.target.value).length > 5){
       this.pass = true;
this.NouveauPass = ev.target.value 
    }else{
      alert('Le mot de passe doit contient au moins 6 caractères')
    }
   
  }
  
}
ConfirmChangePassword(ev : any){

  this.confpass = true
  this.ConfNouveauPass = ev.target.value
  if(this.ConfNouveauPass != this.NouveauPass)
  {
    alert('le nouveau mot de passe et la confirmation doit être compatible')
  }
}

CreateUser(){
  if(this.NouveauPass == undefined )
  {
    this.pass = false
  }
  if( this.ConfNouveauPass == undefined){
    this.confpass = false;
  }
  if(this.Email == true )
  {
    
    this.utilisateur.Email = this.NvEmail;
  }
  else {
    this.utilisateur.Email= this.AncienEmail
  }
  if(this.section == true)
  {
    this.utilisateur.Section = this.NvSection
  }else {
    this.utilisateur.Section = this.AncienSection
  }
  if(this.pass == true)
  {
    this.utilisateur.password = this.NouveauPass
  }else{
    this.utilisateur.password = this.Actualpassword
  }
  this.utilisateur.Matricule = this.Matricule

if(this.pass == true && this.confpass == true ){
  if(this.Emailval == undefined)
  {
    this.validMail = true
  }
  if(this.validMail == true){
  this.authService.update(this.utilisateur)
  .subscribe( 
    result => {
      localStorage.removeItem('currentUser');
     this.router.navigateByUrl('/auth/login')
       console.log (`result`,result);

    },
    err => {
      console.log(err);
    },
      );
  }else{
    alert('adresse email invalide!')
  }
}else{
  alert('veuillez changer votre mot de passe')
}
  

}
Annuler(){
  this.router.navigateByUrl('/backend/dashboard')
}


}
