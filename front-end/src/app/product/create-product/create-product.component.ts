
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Produit } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  
  alerte  !: boolean;
  Produits!: Produit[];

  productForm !: FormGroup;
  model !: Produit;
  title !: string;
  productCode : any;
  update = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
   
    this.createForm();
    
    // edit product
    this.productCode = this.route.snapshot.paramMap.get('Code');
    if(this.productCode) {
      this.getProduct();
    }
    this.productService.getProducts().subscribe(
      result => {
          this.Produits = result;
          
  
      }
    )
  }

  get f() { 
    
    return this.productForm.controls; }

  goBack() {
    this.router.navigateByUrl('/backend/dashboard/produit');
  }

  createForm() {
    
    this.productForm = this.fb.group({
      Code : [ '', Validators.required],
      Designation: ['', Validators.required],
      Forme: [''],
    })
    console.log('createForm',this.productForm)
    
  }

  

  verifProduit() : any{

    for(var i in this.Produits)
    {
      console.log('produits Code',this.productForm.value.Code)
      if(this.productForm.value.Code == this.Produits[i].Code)
      {
        
        this.alerte = true;  
     break
      }
      else {
        this.alerte = false
        console.log("alertFalse",this.alerte)
      
        
      }
  }
    
  }  

  onSubmit() {
    
    this.model = this.productForm.value;
    
     
       if (this.productCode ) {
      this.updateProduct();
    } else {
      this.addProduct();
    
     }
    
  
    
  }

  addProduct() {
    this.model = this.productForm.value;
    console.log('addProduct',this.model)
    
    if(this.alerte == true){
      alert("Code produit existe déja!")
    }
    else{
      this.productService.addProduct(this.model).subscribe(
        result => {
          console.log(result);
          if (  result) {
            this.router.navigateByUrl('/backend/dashboard/produit');
          } else {
            
          }
        }
      )
    }
      
    
   
  }

  updateProduct() {

    this.model = this.productForm.value;
    this.model.Code = this.productCode;
    
    this.productService.updateProduct(this.model).subscribe(
      result => {
        console.log(result);
        if ( result) {
          let success =true;
         // this.router.navigateByUrl('/backend/dashboard/produit');
          this.router.navigateByUrl(`/backend/dashboard/produit/${success}`)
        } else {
        }
      })
  }

  getProduct() {
    this.productService.getProduct(this.productCode).subscribe(
      result => {
        console.log('produiittttt',result)   
        console.log(result);
        this.update = true ;
        let res : any = result;
        this.productForm.patchValue(res.data)
      }
    )
    }

}
