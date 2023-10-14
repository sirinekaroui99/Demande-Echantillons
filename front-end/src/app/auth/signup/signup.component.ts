
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { passwordMatchValidator } from '../../shared/validators/password-match';
import { AuthService } from '../services/auth.service';
import { CommandeService } from 'src/app/Demande/services/commande.service';
import { Sections } from 'src/app/Demande/models/commande';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm !: FormGroup;
  model !: User;
  title !: string;
  isMessage !: boolean;
mat = true;
sections!: Sections[]

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commandeService : CommandeService,
  ) {}

  ngOnInit() {
    this.createForm();
    this.title = 'Créer un compte';
    this.getSections();
   
  }

  getSections(){
    this.commandeService.getSections().subscribe(
      result => {
      this.sections = result;
       })
   }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passconf: ['', Validators. required],
      Nom: ['', Validators.required],
      Prenom: [''],
      Email: ['', [Validators.required, Validators.email]],
      Matricule: ['', Validators.required],
      Section: ['', Validators.required],
    },
    
    
    { validators: passwordMatchValidator },
    
   
    )
  }

  get f() { return this.signupForm.controls }

  onSubmit() {
    this.model = this.signupForm.value;
    this.authService.getMatricule().subscribe(
      result => {
        
        for(var i in result){
          if(this.model.Matricule == result[i].Matricule)
          {
            alert('Matricule saisie existe déja!')
          this.mat = false
          break
          }else{
            this.mat = true
          }
          
        }
        if(this.mat == true)
        {
          this.authService.signup(this.model).subscribe(
      result => {
        //console.log(result);
        if( result) {
          let Msg = true;
          this.router.navigateByUrl(`/backend/dashboard/listeUtilisateur/${Msg}`);
          
        }
      },
    )
        }
      
        
      }
    )
   
    
  }

}
