import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  role !: string;
  admin = false;
  user = false;
  constructor(private breakpointObserver: BreakpointObserver, private authService : AuthService) {}

  ngOnInit(){

    this.authService.getInfUser().subscribe(
      result => {
        this.role = result[0].role;
         if(JSON.stringify(this.role) == JSON.stringify('admin'))
    {
      this.admin = true;
    }
    else {
      this.user = true;
    }
      }
    )
   
    
  }
}
