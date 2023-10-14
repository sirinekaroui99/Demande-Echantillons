import { MsgComponent } from './../../shared/msg/msg.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  title !: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
   if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/backend/dashboard');
    }
  }

  ngOnInit() {
    this.title = 'Connexion';
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  get f() { return this.loginForm.controls }

  onSubmit() {
    
    this.authService.login({
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }).subscribe(
      result => {
        if (result) {
          this.messageService.clear();
          this.router.navigateByUrl('/backend/dashboard');
        }
      }
    )
  
  }

}