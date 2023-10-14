import { Role } from './../models/user';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Login !: boolean;
  id  :any;
  Logout !: boolean;
  private apiUrl = `${environment.apiUrl}/auth`;
  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  redirectUrl !: string;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('AuthService')
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data, this.httpOptions)
    .pipe(
      catchError(this.handleError('signup', null))
    )
  }

  updatePassword(data : any){
    return this.http.put(`${environment.apiUrl}/auth/updatePassword`, data, this.httpOptions)
    .pipe(
      catchError(this.handleError('updatePassword', null))
    )
  }

  login(data: any): Observable<boolean> {
    
    return this.http.post(`${this.apiUrl}/login`, data, this.httpOptions)
    .pipe(
      tap(user => this.doLogin(user)),
      mapTo(true),
      catchError(this.handleError('login', false))
    )
  }

  doLogin(user: any) {
    console.log('dologin')
   this.Login = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser() {  
    
    return localStorage.getItem('currentUser');
  }

  getDecodeToken(token: any) {
    try {
      const data = jwt_decode(token);
      return data;
      // valid token format
    } catch(error) {
      // invalid token format
    }
  }   

  isLoggedIn() :any { 
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const token : any= this.getDecodeToken(JSON.parse(currentUser).token);
      //console.log('tokeeeeeeeen',token.sub)
      this.id = token.sub
     const currentTime = Math.round((new Date()).getTime() /1000 );
     return true;

    }
  }

  logout() {
    this.Logout = true;
    localStorage.removeItem('currentUser');
  }

  getUser(Matricule :any) :Observable<User[]>{
    
    return this.http.get<User[]>(`${this.apiUrl}/user/${Matricule}`)
    .pipe(
      catchError(this.handleError('getUser', []))
    )
  }
  findUser(Email : any,Matricule :any):Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/findUser/${Email}/${Matricule}`)
    .pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  getInfUser() :Observable<User[]>{
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const token : any= this.getDecodeToken(JSON.parse(currentUser).token);
      //console.log('tokeeeeeeeen',token.sub)
      this.id = token.sub}
    return this.http.get<User[]>(`${this.apiUrl}/Infuser/${this.id}`)
    .pipe(
      catchError(this.handleError('getInfUser', []))
    )
    
  }
 
  update(data: any) {
    return this.http.put(`${environment.apiUrl}/User/update`, data, this.httpOptions)
    .pipe(
      catchError(this.handleError('update', null))
    )
  }
  updateUserINF(data : any){
    return this.http.put(`${environment.apiUrl}/User/updateUserINF`, data, this.httpOptions)
    .pipe(
      catchError(this.handleError('updateUserINF', null))
    )
  }
  

 


  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/User/users`)
    .pipe(
      catchError(this.handleError('getUsers', []))
    )
  }
  deleteUser(Matricule: number) {
    return this.http.delete(`${environment.apiUrl}/User/deleteUser/${Matricule}`)
    .pipe(
      catchError(this.handleError('deleteUser', null))
    )
  } 

  getMatricule() : Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/User/Matricule`)
    .pipe(
      catchError(this.handleError('getMatricule', []))
    )
  } 
  getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(`${environment.apiUrl}/User/getRoles`)
    .pipe(
      catchError(this.handleError('getRoles', []))
    )
  }


  
}
