

import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Commande, Sections } from '../models/commande';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = `${environment.apiUrl}`;
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
    this.handleError = this.httpErrorHandler.createHandleError('CommandeService')
  }

  getNumCmd() : Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/commande/Num`)
    .pipe(
      catchError(this.handleError('getNumCmd', []))
    )
  }

  
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commande`)
    .pipe(
      catchError(this.handleError('getCommandes', []))
    )
  }

  getCommande(Num_cmd: number):  Observable<Commande[]>  {
    return this.http.get<Commande[]>(`${this.apiUrl}/commande/${Num_cmd}`)
    .pipe(
      catchError(this.handleError('getCommande', []))
    )
  }
  getCmd(User : any) : Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commande/cmd/${User}`)
    .pipe(
      catchError(this.handleError('getCommande', []))
    )
  }
  getValidCmd(User : any) : Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commande/Validcmd/${User}`)
    .pipe(
      catchError(this.handleError('getCommande', []))
    )
  }

  addCommande(commande: Commande) {
    return this.http.post<Commande>(`${this.apiUrl}/commande/add`, commande, this.httpOptions)
    .pipe(
      
      catchError(this.handleError('addCommande', null))
    )
  }

  updateCommande(commande: Commande) {
    return this.http.put<Commande>(`${this.apiUrl}/commande/update`, commande, this.httpOptions)
    .pipe(
      catchError(this.handleError('updateCommande', null ))
    )
  }
  updateCmdPdt(data : any,Pdt : any,num : number){
    console.log('encodeURIComponent()',encodeURIComponent(data))
    
    return this.http.get<any>(`${this.apiUrl}/commande/updatePdt/${encodeURIComponent(data)}/${encodeURIComponent(Pdt)}/${num}`)
    .pipe(
      
      catchError(this.handleError('updateCmdPdt', null))
    )
  }
  updateCmdQte(Qte : any,qte : any ,Pdt : any,num : number){
    return this.http.put(`${this.apiUrl}/commande/updateQte/${Qte}/${qte}/${encodeURIComponent(Pdt)}/${num}`,null)
    .pipe(
      catchError(this.handleError('updateCmdQte', null))
    )
  }
  
  

  sendValidCmd( data : any){
    return this.http.post(`${this.apiUrl}/sendMail/sendValidmail` ,data)
        
  }
  sendRefusCmd(data : any){
    return this.http.post(`${this.apiUrl}/sendMail/sendRefusMail` ,data)
  }
  sendCmd(data : any){
   return this.http.post(`${this.apiUrl}/sendMail/sendmail` ,data)
  }

  deleteCommande(Num_cmd: number) {
    return this.http.delete(`${this.apiUrl}/commande/delete/${Num_cmd}`)
    .pipe(
      catchError(this.handleError('deleteCommande', null))
    )
  } 
  sendFile(data : any){
    return this.http.post<any>(`${this.apiUrl}/File/file` ,data)  
  } 

  deleteCmd(User : any , Produit : any, Quantite : any,Num_cmd : any){
  
    return this.http.delete(`${this.apiUrl}/commande/delete/${User}/${encodeURIComponent(Produit)}/${Quantite}/${Num_cmd}`)
    .pipe(
      catchError(this.handleError('deleteCmd', null))
    )
  }
  getSections(): Observable<Sections[]> {
    //console.log('sectionssss', this.http.get<string[]>(`${this.apiUrl}/sections`))
    return this.http.get<Sections[]>(`${this.apiUrl}/section`)
    .pipe(
      catchError(this.handleError('getSections', [])) 
    )
  }

  getSection(Matricule: any) {
    return this.http.get<any>(`${this.apiUrl}/section/section/${Matricule}`)
    .pipe(
      catchError(this.handleError('getSection', null))
    )
  }

 
 

}
