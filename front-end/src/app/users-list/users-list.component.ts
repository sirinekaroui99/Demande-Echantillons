import { CommandeService } from './../Demande/services/commande.service';
import { UserINF, utilisateur, Role } from './../auth/models/user';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sections } from '../Demande/models/commande';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  nb = ' ';
  valid !: boolean

  users !: User[];
  role !: string;
  roleChange = false;;
  mailChange = false;
  sectionChange = false;
  passChange = false;
  validMail  = true;
  success = false;

  utilisateur : UserINF = {
    Matricule : 0,
    role : '',
    Section :'',
    Email : '',
    password : '',
    is_active : true,
 
   };
   roles !: Role[]
   sections!: Sections[]
   Msg : any;
  constructor(private authService : AuthService,private commandeService :CommandeService,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.Msg = this.route.snapshot.paramMap.get('Msg')
    this.authService.getUsers().subscribe((data : any) => {
      this.users = data;
    })
    this.getSections();
    this.getRoles();
  }

  getRoles(){
    this.authService.getRoles().subscribe(
      result => {
      this.roles = result;
       })
  }
  getSections(){
    this.commandeService.getSections().subscribe(
      result => {
      this.sections = result;
       })
   }

  ChangeRole(ev : any){
    if(ev.value){

    this.roleChange = true;
    this.utilisateur.role = ev.value;
    }else{
      this.roleChange = false
    }
  }
  ChangeEmail(ev : any){
    
    var index = ev.target.value.indexOf("@");    
    if(index !== -1){
      this.validMail = true;
         this.mailChange = true;
      this.utilisateur.Email = ev.target.value;  
    } else{
this.validMail = false;
        alert("adresse email invalide!");
    }
      
  }
  ChangeSection(ev : any){
   console.log('hjhjjh',ev.value)
      this.sectionChange = true
      this.utilisateur.Section = ev.value;
  }
  ChangePass(ev : any){
    if((ev.target.value).length > 5)
    {
      this.passChange = true;
      this.utilisateur.password = ev.target.value;
    }else{
     alert('Le mot de passe doit contient au moins 6 caractères')
    }
      
  }
  updateUserRole(user : UserINF){
    if(!this.roleChange)
    {
      this.utilisateur.role = user.role;
    }
    if(!this.mailChange)
    {
      this.utilisateur.Email = user.Email;
    }
    if(!this.sectionChange)
    {
      this.utilisateur.Section = user.Section;
    }
   
    
    this.utilisateur.Matricule = user.Matricule;
    if(this.validMail == true){
     this.authService.updateUserINF(this.utilisateur)
    .subscribe( 
      result => {
        this.success = true;
         console.log (`result`,result);
         this.authService.getUsers().subscribe((data : any) => {
          this.users = data;
        })
         
      },
      err => {
        console.log(err);
      },
        ); 
    }
    else{
      alert('adresse email invalide!')
    }
    
  

  }

  deleteUser(mat : any){
    if(confirm("Vous êtes sûr de supprimer l'utilisateur "+mat)){
      this.authService.deleteUser(mat)
    .subscribe( 
      result => {
        this.users = this.users.filter(item => item.Matricule != mat)
         console.log (`result`,result);
  
      },
      err => {
        console.log(err);
      },
        );
    }
    
  }

  clear(){
    this.success = false
  }
  clearUser(){
    this.Msg = false
  }
  
  search(ev :any){

 if(ev.target.value!= this.nb){
  this.nb = ev.target.value
  this.authService.getUsers().subscribe((data : any) => {
    this.users = data;
    
   this.users = this.users.filter(
   user => user.Matricule == ev.target.value);

  })
    
 }
 if(ev.target.value == '')
 {
  this.authService.getUsers().subscribe((data : any) => {
    this.users = data;
    
});
 }

   
  }
 
  
 
}
