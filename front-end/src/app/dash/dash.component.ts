import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { CommandeService } from '../Demande/services/commande.service';
import { Commande } from '../Demande/models/commande';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  mois1 = 1;
  mois2 = 2;
  mois3 = 3;
  mois4 = 4;
  mois5 = 5;
  mois6 = 6;
  mois7 = 7;
  mois8 = 8;
  mois9 = 9;
  mois10 = 10;
  mois11 = 11;
  mois12 = 12;

  var1 = 0;
  var2 = 0;
  var3 = 0;
  var4 = 0;
  var5 = 0;
  var6 = 0;
  var7 = 0;
  var8 = 0;
  var9 = 0;
  var10 = 0;
  var11 = 0;
  var12 = 0;


  sec1 =0;
  sec2 =0;
  sec3 =0;
  sec4 =0;


  ValidCmd = 0;
  RefusCmd = 0;
  CmdEnCours = 0;
  totalCmd = 0;
  totCmdMois = 0;

 
  chart :any  =[]
  date : any;
  mois !: number;
color : any[] =[]
section : any[] = [];
valeur : any[] = []
  sec : number[] = [];
  sections !: any[]
  commandes !: Commande[]
  TabSection = new Array();
  tabCouleur : any[] = ["red","orange","yellow","green","Aqua","Bisque","BlueViolet","BurlyWood","Brown","Coral","CornflowerBlue","DarkGoldenrod","DarkBlue","DarkGray",
  "DeepPink","Gold","HotPink","LightCoral","LightSteelBlue","Lime","DarkCyan","Violet","RoyalBlue","Crimson"]

  /** Based on the screen size, switch from standard to one column per row */
 
 
    
  constructor(private breakpointObserver: BreakpointObserver,private commandeService :CommandeService) {}
 ngOnInit(): void {
    this.count();
    //this.getSections();
  }
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Demandes', cols: 1, rows: 1 },
          { title: 'Demandes En cours', cols: 1, rows: 1 },
          { title: 'Demandes Validées', cols: 1, rows: 1 },
          { title: 'Demandes Refusées', cols: 1, rows: 1 },
          { title: 'card', cols: 4, rows: 1 }
        ];
      }
     
      

      return [
        { title: 'Demandes', cols: 1, rows: 1 },
        { title: 'Demandes En cours', cols: 1, rows: 1 },
          { title: 'Demandes Validées', cols: 1, rows: 1 },
          { title: 'Demandes Refusées', cols: 1, rows: 1 },
          { title: 'Nombre des demandes par section', cols: 4, rows: 3 }
      ];
    })
  );

  doughnutgraph(tab : any,val : any){

    this.commandeService.getSections().subscribe(
      result => {let nbr = -1;
       
       for(var i=0;i<val.length;i++){
         if(val[i]!= 0){
          
           nbr = nbr + 1 ;
        
        this.color[nbr] = this.tabCouleur[i]
        this.section[nbr] = this.sections[i].Intitule
        this.valeur[nbr] = val[i]
   //  this.tabCouleur.length = nbr+1
      


         }
       }

    this.chart = new Chart('doughnut',{
      type : 'doughnut',
     options : {
       responsive : true,
       title : {
         display : true,
         text : 'Nombre des demandes par section'
       }, legend: {
         position :'top',
       }, animation : {
         animateScale: false,
         animateRotate : true
       }
     },
     data:{
       datasets : [{
         data: this.valeur,
         backgroundColor : this.color,
         label : 'Dataset 1'
       }],
       labels: this.section
       }
    })
  })
  }


  count(){
    this.commandeService.getCommandes().subscribe(
      result => {
        this.commandes = result
        console.log('res',result)
        for (var i in result)
        {          
          if(result[i].status == 'Validée')
          {
             this.ValidCmd = this.ValidCmd+1

         
          }else{
            if(result[i].status == 'Refusée')
            {
               this.RefusCmd = this.RefusCmd + 1
           
            }else{
              this.CmdEnCours = this.CmdEnCours + 1;
              
            }
            
             
          }
        }
       this.CmdEnCours = this.CmdEnCours - 1
        this.commandeService.getSections().subscribe(
          result => {
          this.sections = result
          for(var i in this.sections){
            this.sec[i] = 0 ;
           
           }
            for(var i in this.commandes){
            
          this.commandeService.getSection(this.commandes[i].User).subscribe(
            result => { 
              for(var i in result)
             // console.log('ressssssssss',result)
              {
                
                  for(var k in this.sections)
                  {
                   
                    if(result[i] != null)
                    if( result[i].Section == this.sections[k].Intitule){
                     
                    
                      this.sec[k] = this.sec[k]+1
                      this.commandeService.getSections().subscribe(
                        result => {
                        this.sections = result
                        for(var i in  this.sections)
                         {
                           this.TabSection[i] =  this.sections[i].Intitule
                          
                         }
                         })
                    
                    } 
                  }
                
              } this.doughnutgraph(this.TabSection,this.sec);
            }
          )
        }
           })

      
        
console.log('ValidCmd',this.ValidCmd);
console.log('RefusCmd',this.RefusCmd);
console.log('CmdEnCours',this.CmdEnCours -1);  
this.totalCmd = this.ValidCmd+this.RefusCmd+this.CmdEnCours
console.log('total',this.totalCmd)
for(var i in this.commandes) {
  this.date = new Date(result[i].Date_cmd)
            console.log('dateValid',this.date.getMonth()+1)
            this.mois = this.date.getMonth()+1
if(this.mois == 1)
{
  this.var1 = this.var1 + 1
}
if(this.mois == 2)
{
  this.var2 = this.var2 + 1
}
if(this.mois == 3)
{
  this.var3 = this.var3 +1 
}
if(this.mois == 4)
{
  this.var4 = this.var4+ 1 
}
if(this.mois == 5)
{
  this.var5 = this.var5 +1 
}
if(this.mois == 6)
{
  this.var6 = this.var6+1
}
if(this.mois == 7){
  this.var7 = this.var7+1
}
if(this.mois == 8)
{
  this.var8 = this.var8 +1 
}
if(this.mois == 9)
{
  this.var9 = this.var9 +1
}
if(this.mois == 10)
{
  this.var10 = this.var10 + 1
}
if(this.mois == 11)
{
  this.var11 = this.var11 +1
}
if(this.mois == 12)
{
  this.var12 = this.var12 +1 
}
}

if(this.var1 != 0)
this.var1 = this.var1-1;
if(this.var2 != 0)
this.var2 = this.var2-1;
if(this.var3 != 0)
this.var3 = this.var3-1;
if(this.var4 != 0)
this.var4 = this.var4-1;
if(this.var5 != 0)
this.var5 = this.var5-1;
if(this.var6 != 0)
this.var6 = this.var6-1;
if(this.var7 != 0)
this.var7 = this.var7-1;
if(this.var8 != 0)
this.var8 = this.var8-1;
if(this.var9 != 0)
this.var9 = this.var9-1;
if(this.var10 != 0)
this.var10 = this.var10-1;
if(this.var11 != 0)
this.var11 = this.var11-1;
if(this.var12 != 0)
this.var12 = this.var12-1;


return this.totalCmd;
      }
    )
    
  }

  










 // PieGraph(){
   // this.chart = new Chart('Pie',{
   //   type : 'pie',
  //    data:{
  //      labels: ['Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'],
  //      datasets: [
          
   //    {
    //    label : 'Demandes',
     //   data:[1,3,5,10,56,65,35,543,543,543].reverse(),
    //    backgroundColor : '#ADD8E6',
    //  borderColor :'#5F9EA0',
  //  fill:true, 
   //    }
    //    ]  
    //   }
   // })
//  }

 



}
