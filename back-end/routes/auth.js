
var express = require('express');
var router = express.Router();
var authModel = require('../models/auth-model');
var bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    console.log('routerSignup',req.body.password)
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        req.body.password = hash;
        authModel.signup(req.body, function(err, result) {
            res.json({ data: result, error: err })
        }); 
    });
});


router.post('/login', function(req, res, next) {
    console.log('login')
    passport.authenticate('local', {session: false}, function(err, user, info) {
        
        if (err) { return next(err); }

        if ( !user) {
            return res.status(500).json(info.message)
        }
        
        const payload = {
            username: user.username,
            email: user.email
        }
        const options = {
            subject: `${user.id}`,
            //expiresIn: "24h"
        }
        const token = jwt.sign(payload, 'secret123', options);
        
        res.json({token});

    })(req, res, next);
})

router.put('/updatePassword',function(req,res){
   
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      req.body.password = hash;
  
        authModel.updatePassword(req.body, function(err, result) {
            res.json({ data: result, error: err })
        }); 
      });
  })

router.get('/user/:Matricule', function(req,res,next) {
    
    let Matricule = req.params.Matricule;
    authModel.findByMatricule(Matricule, function(err, result) {
      res.json(result);
  })
  })

  router.get('/findUser/:Email/:Matricule',function(req,res,next){
    let Matricule = req.params.Matricule;
    let Email = req.params.Email;
    authModel.findUser(Email,Matricule, function(err, result) {
        res.json(result);
    })
  })

router.get('/Infuser/:id', function(req,res,next) {

    let id = req.params.id;
    authModel.findUserByid(id, function(err, result) {
       
      res.json(result);
  })
})

module.exports = router;	
