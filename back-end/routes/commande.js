
var express = require('express');
var router = express.Router();

var model = require('../models/commande-model');

router.get('/', function(req, res) {
    model.getCommandes(function(err, result) {
        if(err) {
            res.json(err)
        } else {
            res.json(result); 
        }
    })
})
router.get('/Num', function(req,res) {
    model.getNumCmd(function(err, result) {
        if(err) {
            res.json(err)
        } else {
            res.json(result); 
        }
    })
})
router.get('/cmd/:User', function(req,res) {
    let User = req.params.User;
    model.getCmd(User, function(err, result) {
        res.json( result);
    })
})
router.get('/Validcmd/:User', function(req,res) {
    let User = req.params.User;
    model.getValidCmd(User, function(err, result) {
        res.json( result);
    })
})


router.get('/:Num_cmd', function(req, res) {
    
    let Num_cmd = req.params.Num_cmd;
    model.getCommande(Num_cmd, function(err, result) {
        res.json( result);
    })
})


router.post('/add', function(req, res) {
    model.addCommande(req.body, function(err, result) {
        res.json({data: result, error: err});
    })
})

router.put('/update', function(req, res) {
    model.updateCommande(req.body,function(err, result) {
        res.json({data: result, error: err});
    })
})




router.get('/updatePdt/:data/:Pdt/:num',function(req,res){
    console.log('data1')
    let Pdt = req.params.Pdt;
    let data = req.params.data;
     console.log('data',data)
    let num = req.params.num
    model.updateCmdPdt(data,Pdt,num,function(err, result) {
        res.json({data: result, error: err});
    })
})

router.put('/updateQte/:Qte/:qte/:Pdt/:num',function(req,res){
    console.log('ghghghhgh')
    let Pdt = req.params.Pdt;
    let Qte = req.params.Qte;
    let qte = req.params.qte;
    let num = req.params.num
    model.updateCmdQte(Qte,qte,Pdt,num,function(err, result) {
        res.json({data: result, error: err});
    })
})

router.delete('/delete/:Num_cmd', function(req, res) {
    let Num_cmd = req.params.Num_cmd;
    model.deleteCommande(Num_cmd, function(err, result) {
        res.json({data: result, error: err});
    })
})

router.delete('/delete/:User/:Produit/:Quantite/:Num_cmd',function(req,res) {
    let User = req.params.User;
    let Produit = req.params.Produit;
    let Quantite = req.params.Quantite;
    let Num_cmd = req.params.Num_cmd;

    model.deleteCmd(User,Produit,Quantite,Num_cmd,function(err,result){
        res.json({data: result, error: err});
    })
})
  
module.exports = router;
