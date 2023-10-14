
var express = require('express');
var router = express.Router();
var db = require("../db");
var bcrypt = require('bcrypt');

var authModel = require('../models/auth-model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({name: ''});
});

router.put('/update', function(req, res) {
  const password = req.body.password;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
      req.body.password = hash;
      authModel.updateUser(req.body, function(err, result) {
          res.json({ data: result, error: err })
      }); 
  });
});


router.put('/updateUserINF', function(req, res) {
  const password = req.body.password;
  if(password !== '')
  {
    const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    req.body.password = hash;

      authModel.updateUserINFPass(req.body, function(err, result) {
          res.json({ data: result, error: err })
      }); 
    });
  }else{
    authModel.updateUserINF(req.body, function(err, result) {
      res.json({ data: result, error: err })
    })
  }
  
});





router.delete('/deleteUser/:Matricule', function(req, res) {
  let Matricule = req.params.Matricule;
  authModel.deleteUser(Matricule, function(err, result) {
      res.json({data: result, error: err});
  })
})

router.get('/Matricule', function(req, res) {
  
  authModel.getMatricule(function(err, result) {
    if(err) {
      res.json(err)
  } else {
      res.json(result); 
  }
  })
})



router.get('/users', function(req,res){
  authModel.findUsers(function(err, result) {
    if(err) {
        res.json(err)
    } else {
        res.json(result); 
    }
})

  
})

router.get('/getRoles',function(req,res){
  authModel.getRoles(function(err,result){
    if(err) {
      res.json(err)
  } else {
      res.json(result); 
  }
  })
})








module.exports = router;
