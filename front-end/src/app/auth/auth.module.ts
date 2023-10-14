import { MsgComponent } from './../shared/msg/msg.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { UserOublierComponent } from '../user-oublier/user-oublier.component';


@NgModule({
  declarations: [
    LoginComponent,
    MsgComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class AuthModule { }

