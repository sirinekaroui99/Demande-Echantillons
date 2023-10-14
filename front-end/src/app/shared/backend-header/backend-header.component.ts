import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backend-header',
  templateUrl: './backend-header.component.html',
  styleUrls: ['./backend-header.component.css']
})
export class BackendHeaderComponent implements OnInit {
  nav = false ;
  UserOpalia !: boolean;
 Admin !: boolean;
 Responsable !: boolean;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.authService.isLoggedIn())
    this.user();
  }

  user(){
    this.authService.getInfUser().subscribe(
      result => {
        
        if(result[0].role == 'UserOpalia')
        {
          
          this.UserOpalia = true
          console.log(result[0].role)
        }else{
          this.UserOpalia = false
        }

        if(result[0].role == 'Admin'){
           
          console.log(result[0].role)
          this.Admin = true
        }else{
          this.Admin = false
        }

        if(result[0].role == 'Responsable PRT'){ 
         
          this.Responsable = true
          console.log(result[0].role)
        }else{
          this.Responsable = false
        }

      }
      
    )
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  button(){
    this.nav = true;
  }

}
