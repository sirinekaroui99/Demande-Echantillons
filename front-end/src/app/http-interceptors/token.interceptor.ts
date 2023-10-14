
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   if (this.authService.isLoggedIn()) {
      const currentUser : any= this.authService.getCurrentUser();
      console.log('intercept',currentUser)
      request = request.clone({
          setHeaders: { Authorization: `Bearer ${ JSON.parse(currentUser).token}` }
      });
   }
   // return next.handle(request);
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
          location.reload(true);
      }
      
      const error = err.error.message || err.statusText;
      return throwError(error);
  }))
  }

  
    

  
}
