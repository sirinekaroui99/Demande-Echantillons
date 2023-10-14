
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { environment } from '../../../environments/environment';
import { Produit } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/product`;
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
    this.handleError = this.httpErrorHandler.createHandleError('ProductService')
  }

  getProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}`)
    .pipe(
      catchError(this.handleError('getProducts', []))
    )
  }

  getProduct(id: number) : Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(this.handleError('getProduct', []))
    )
  }

  addProduct(product: Produit) {
    return this.http.post<Produit>(`${this.apiUrl}/add`, product, this.httpOptions)
    .pipe(
      catchError(this.handleError('addProduct', null))
    )
  }

  updateProduct(product: Produit) {
    return this.http.put<Produit>(`${this.apiUrl}/update`, product, this.httpOptions)
    .pipe(
      catchError(this.handleError('updateProduct', null))
    )
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
    .pipe(
      catchError(this.handleError('deleteProduct', null))
    )
  }

}

