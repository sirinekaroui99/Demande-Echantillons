import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Produit } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/services/product.service';
import { Commande } from '../models/commande';

@Component({
  selector: 'app-produit5',
  templateUrl: './produit5.component.html',
  styleUrls: ['./produit5.component.css']
})
export class Produit5Component implements OnInit {

  options! : Produit[];
  tab = new Array();

  @Output() commande5: Commande = {
    Num_cmd : 0,
    Date_cmd : new Date(),
    Produit : '',
    Quantite : 0,
    User : '',
    status : '',
    certificat : '',
    commentaire : '',
    rejet : '',
  };

  filteredOptions !: Observable<Produit[]>;
  myControl = new FormControl();

  constructor(private produitService: ProductService) { }

  ngOnInit(): void {
    this.produitService
      .getProducts()
      .subscribe((data : any)=> {
      this.options = data ;

     
      for(var i of data) {
        this.tab.push(i)
      }
       });
       this.filteredOptions = this.myControl.valueChanges
       .pipe(
         startWith(''),
         map(value => typeof value === 'string' ? value : value.Designation),
         map(Designation => Designation ? this._filter(Designation) : this.tab)
       );
  }
  
  displayFn(user: Produit): string {
    return JSON.stringify(user && user.Designation ? user.Designation : '');
  }

  private _filter(Designation: string): Produit[] {
    const filterValue = Designation.toLowerCase();

    return this.tab.filter(option => option.Designation.toLowerCase().indexOf(filterValue) === 0);
  }

}
