
var db = require("../db");

let model = {
    signup: (input, cb) => {

        let data = {
            username: input.username,
            password: input.password,
            Matricule : input.Matricule,
            Section : input.Section,
            Email: input.Email,
            Nom: input.Nom,
            Prenom: input.Prenom,
            is_active: 1
        };
        
        return db.query("INSERT INTO user SET ?", [data], cb)
    },
    updateUser:(input,cb) => {
        let data = {
            Section : input.Section,
            Email: input.Email,
            password:input.password,
            is_active: 1
        };
        return db.query("UPDATE user SET ? WHERE Matricule=?", [data, input.Matricule], cb)
    },
    updateUserINFPass:(input,cb)=>{
        let data = {
            role : input.role,
            Section : input.Section,
            Email : input.Email,
            password : input.password,
            is_active: 1
        };
        return db.query("UPDATE user SET ? WHERE Matricule=?", [data, input.Matricule], cb)
    },

    updatePassword : (input,cb) => {
        
        let data = {
            password : input.password,
        };
        return db.query("UPDATE user SET ? WHERE Matricule=?", [data, input.Matricule], cb)
    },
    updateUserINF:(input,cb)=>{
        let data = {
            role : input.role,
            Section : input.Section,
            Email : input.Email,
            
            is_active: 1
        };
        return db.query("UPDATE user SET ? WHERE Matricule=?", [data, input.Matricule], cb)
    },
    
    deleteUser: (Matricule, cb) => {
        return db.query("DELETE FROM user WHERE Matricule=?", [Matricule], cb);
    },

    findOne: (Email, cb) => {
        return db.query("SELECT * FROM user WHERE Email=? AND is_active=1", [Email], cb);
    },
    findById: (id, cb) => {
        return db.query("SELECT * FROM user WHERE id=? AND is_active=1", [id], cb);
    },
    findByMatricule : (Matricule, cb) => {
        return db.query("SELECT * FROM user WHERE Matricule=? ", [Matricule], cb);
    },
    findUserByid : (id, cb) => {
       
        return db.query("SELECT * FROM user WHERE id=? ", [id], cb);
    },
    findUsers:(cb) => {
        return db.query("SELECT * FROM user",cb);
    },
    getRoles : (cb) => {
        return db.query("SELECT * FROM role",cb);
    },

    findUser : (Email,Matricule,cb) => {
        return db.query("SELECT * FROM user WHERE Email = ? AND Matricule =?",[Email,Matricule],cb)
    },
    getMatricule : (cb) => {
        return db.query("SELECT Matricule FROM user",cb);
    }
}

module.exports = model;

