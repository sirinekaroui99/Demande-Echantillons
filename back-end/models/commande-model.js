
var db = require("../db");
var dateFormat = require('dateformat')



let model = {
    getCommandes: (cb) => {
        
        return db.query("SELECT DISTINCT Num_cmd,Date_cmd,User,status FROM commande", cb)
    },
    getCommande: (Num_cmd, cb) => {
        
        return db.query("SELECT * FROM commande WHERE Num_cmd=?", [Num_cmd], cb)
    },
   

    addCommande: (input, cb) => {

        let currentDate = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss');
        
        
        let data = {
            Num_cmd : input.Num_cmd,
            User: input.User,
            Produit: input.Produit,
            Quantite: input.Quantite,
            Date_cmd: currentDate,
            certificat : input.certificat,
            commentaire : input.commentaire,

        }

        return db.query("INSERT INTO commande SET ?", [data], cb)
    },

    

    updateCommande: (input, cb) => {
        let data = {
            rejet : input.rejet,
            status : input.status,
        }
        
        return db.query("UPDATE commande SET ? WHERE Num_cmd=? ", [data, input.Num_cmd], cb)
    },

    updateCmdPdt : (data,Pdt,num,cb)=> {
        console.log('data',data)
      return db.query("UPDATE commande SET Produit=? WHERE Num_cmd=? AND Produit=? ", [data, num,Pdt], cb)
    },
    updateCmdQte : (Qte,qte,Pdt,num,cb)=> {
        console.log('requete updateQte')
        return db.query("UPDATE commande SET Quantite=? WHERE Num_cmd=? AND Produit=? AND Quantite=?", [qte, num,Pdt,Qte], cb)
      },

  
    deleteCommande: (Num_cmd, cb) => {
        return db.query("DELETE FROM commande WHERE Num_cmd=?", [Num_cmd], cb);
    },
    getNumCmd: (cb) => {
        return db.query("SELECT Num_cmd FROM commande ORDER BY Num_cmd DESC LIMIT 1", cb)
    },
    deleteCmd:(User,Produit,Quantite,Num_cmd,cb) => { 
        return db.query("DELETE FROM commande WHERE User=?  AND Produit=? AND Quantite=? AND Num_cmd=?", [User,Produit,Quantite,Num_cmd], cb);
    },

    getCmd: (User,cb) => {
        console.log('distinct')
        return db.query("SELECT DISTINCT Num_cmd, Date_cmd, User,status,certificat,commentaire FROM commande WHERE User=? ", [User], cb)
    },

    getValidCmd:(User,cb) => {
        return db.query("SELECT DISTINCT Num_cmd,Date_cmd,User,status,certificat,commentaire FROM commande WHERE User=? AND status='validée' ", [User], cb)
    },
    
    
}

module.exports = model;
