import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../auth/models/user';

@Component({
  selector: 'app-user-oublier',
  templateUrl: './user-oublier.component.html',
  styleUrls: ['./user-oublier.component.css']
})
export class UserOublierComponent implements OnInit {
  Form !: FormGroup;
  Mdps = false;
  FormPass !: FormGroup
  model !: User;
  Msg = false;
  pass  !: boolean;
  mat = true;
  confpass !: boolean;
  Actualpassword !: string;
  NouveauPass !: string;
  ConfNouveauPass !: string;
  signupForm !: FormGroup;

  constructor( private fb: FormBuilder,
    private authService :AuthService,private router: Router,
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.FormCreate();
this.createFormsignup();
  }
  createForm() {
    this.Form = this.fb.group({
      Matricule: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      
    })
  }
  createFormsignup() {
    this.signupForm = this.fb.group({
      username: ['sirine'],
      password: ['sirine'],
      passconf: ['sirine'],
      Nom: ['sirine'],
      Prenom: ['karoui'],
      Email: ['sirine@gmail.com'],
      Matricule: ['2628'],
      Section: ['LINE 03'],
    },
    
    
   
    )
  }


  FormCreate() {
    this.FormPass = this.fb.group({
      NvPass: ['', [Validators.required, Validators.minLength(6)]],
      ConfNvPass: ['', [Validators.required, Validators.minLength(6)]],
      
    })
  }
  get f() { return this.Form.controls , this.FormPass.controls, this.signupForm.controls}

  onSubmit() {
    this.model = this.signupForm.value;
        console.log('dddddd',this.signupForm)
            this.mat = true
          
          this.authService.signup(this.model).subscribe(
      result => {
        console.log('fffffffffff',result);
        if( result) {
          let Msg = true;
          this.router.navigateByUrl(`/backend/dashboard/listeUtilisateur/${Msg}`);
          
        }
      },
    )
        
      
        
      
    
    console.log('gggggggggggggg', this.Form.get('Email')?.value,
    this.Form.get('Matricule')?.value)
    this.authService.findUser(
       this.Form.get('Email')?.value,
      this.Form.get('Matricule')?.value
    ).subscribe(
      result => {
        if (result) {
         this.Mdps = true;
            console.log('mot de passe ',this.Mdps )
          }else{
            alert("Votre compte n'existe pas")
          }
      }
    
      
    )
  }

  ChangePassword(ev : any){ 
    if(ev.target.value != ' '){
      this.pass = true;
  this.NouveauPass = ev.target.value 
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

  Rechercher(){
    this.authService.updatePassword( {password : this.FormPass.get('NvPass')?.value,
   Matricule : this.Form.get('Matricule')?.value}).subscribe(
      result => {
        console.log('rrrrrrr',result)
        this.Msg = true;
      }
    )
  }

}
