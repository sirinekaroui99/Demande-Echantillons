
export interface User {
    id: number;
    username: string;
    password: string;
    Email: string;
    Nom: string;
    Prenom: string;
    Matricule : number;
    Section : string;
    role :string
    is_active: boolean; 
}

export interface utilisateur {
    
    Matricule : number;
    Email: string;
    Section : string;
    password: string;
    is_active: boolean; 
}

export interface UserINF {
    Matricule : number;
    role : string;
    Email : string;
    Section : string;
    password : string;
    is_active: boolean; 
}
export interface Role {
    role : string;
}