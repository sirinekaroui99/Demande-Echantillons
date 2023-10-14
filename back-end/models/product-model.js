
var db = require("../db");

let model = {
    getProduits: (cb) => {
        return db.query("SELECT * FROM produit", cb)
    },
    getProduct: (Code, cb) => {
      
        return db.query("SELECT * FROM produit WHERE Code=?", [Code], cb)
    },
   

    addProduct: (input, cb) => {

        
        let data = {
            Code:input.Code,
            Designation: input.Designation,
            Forme: input.Forme,
        }

        return db.query("INSERT INTO produit SET ?", [data], cb)
    },
    updateProduct: (input, cb) => {
        let data = {
            
            Designation: input.Designation,
            Forme: input.Forme,
        }
        return db.query("UPDATE produit SET ? WHERE Code=?", [data, input.Code], cb)
    },
    deleteProduct: (Code, cb) => {
        return db.query("DELETE FROM produit WHERE Code=?", [Code], cb);
    }
}

module.exports = model;
