var db = require("../db");

let model = {
    getSections: (cb) => {
       
        return db.query("SELECT * FROM sections", cb)
    },
    getSection: (Matricule, cb) => {
      
        return db.query("SELECT Section FROM user WHERE Matricule=?", [Matricule], cb)
    },

  
}

module.exports = model; 
