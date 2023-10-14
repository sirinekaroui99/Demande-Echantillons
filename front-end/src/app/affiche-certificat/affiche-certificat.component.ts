import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-affiche-certificat',
  templateUrl: './affiche-certificat.component.html',
  styleUrls: ['./affiche-certificat.component.css']
})
export class AfficheCertificatComponent implements OnInit {

  certificat !: any ;
  ImprimCertificat !: any;
existe !: boolean
image = false
imprim !: any

  constructor(
    private route: ActivatedRoute) { }
Notcert !: boolean
  ngOnInit(): void {
    this.certificat = this.route.snapshot.paramMap.get('certificat');

    if(this.certificat.indexOf('true') !=-1){
     this.imprim=  this.certificat.replace("true","");
     console.log('imprim',this.imprim)
  this.image = true
    }
    
    if((this.certificat).indexOf(JSON.stringify(null)) != -1){ 
     
      this.Notcert = true;
    }else{
      this.Notcert = false
    }
  }

  
print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-certificat')!.innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin!.document.open();
  popupWin!.document.write(`
    <html>
      <head>
        <title></title>
        <style>
        
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin!.document.close();
}


}
