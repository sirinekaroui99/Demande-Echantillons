export interface Commande {
    Num_cmd : number;
    Date_cmd : Date;
    Produit : String;
    Quantite : Number;
    User : string;
    status : string;
    certificat : string;
    commentaire : string;
    rejet : any;
  }

  export interface Sections {
    Intitule : string;
  }

  export interface Sec {
    Section : string;
  }