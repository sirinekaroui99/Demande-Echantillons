import { CommandeService } from './../../Demande/services/commande.service';

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Produit } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Commande } from 'src/app/Demande/models/commande';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  success !: any;
  productForm !: FormGroup;
  model !: Produit;
  productCode : any;
  commandes !: Commande[]
  nb = 0;
  Vide !: boolean;
  Produits!: Produit[];
tab = new Array()
  constructor(
    private productService: ProductService,
    private router: Router,private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.success = this.route.snapshot.paramMap.get('success')
    this.getProducts();
  }
  
 search(ev :any){

 

if(ev.target.value!= this.nb){
this.nb = ev.target.value
this.productService.getProducts().subscribe(
 result => {
  this.Produits = result;
  this.Produits = this.Produits.filter(
    Produits => Produits.Code == ev.target.value);
    
  if(JSON.stringify(this.Produits) == JSON.stringify([]))
  {
       this.Vide = true;
  }else{
    this.Vide = false;
  }
  });

  if(ev.target.value == '')
  {
   
      this.productService.getProducts().subscribe(
        result => {
            this.Produits = result;
          
        }
      )
      }
  }


}
  getProducts() {
    this.productService.getProducts().subscribe(
      result => {
          this.Produits = result;
        
      }
    )
  }

  deleteProduct(Code: any) {
    if(confirm('Voulez-vous vraiement supprimer le produit '+Code)){
      this.productService.deleteProduct(Code).subscribe(
        result => {
          console.log('produit a supprimer',result);
          if (  result) {
            this.Produits = this.Produits.filter(item => item.Code != Code)

          } else {
            alert('Echec de supression!');  
          }
        }
      )
    }
    
      
  }
  
  

  goToAddProduit(){
    this.router.navigateByUrl('/backend/dashboard/createProduit');
  }
  goToUpdateProduit(Code : any){
    this.router.navigateByUrl(`/backend/dashboard/updateProduit/${Code}`)
  }


  updateProduct() {
    this.model = this.productForm.value;
    this.model.Code = this.productCode;
    
    this.productService.updateProduct(this.model).subscribe(
      result => {
        console.log(result);
        if ( result) {
          this.router.navigateByUrl('/produit');
        } else {
        }
      })
  }

  getProduct(Code : any) {
    this.productService.getProduct(Code).subscribe(
      result => {
        console.log('produit',result);
        let res : any = result;
        this.productForm.patchValue(res.data)
      },
      error => {
        console.log('erreeeeer')
      }
    )
  }
  clear(){
   this.success = false
   this.getProducts();
  }


}




