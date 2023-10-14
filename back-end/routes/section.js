

var express = require('express');
var router = express.Router();

var model = require('../models/section-model');

router.get('/', function(req,res) {
    model.getSections(function(err, result) {
        if(err) {
            res.json(err)
        } else {
            res.json(result); 
        }
    })
})


router.get('/section/:Matricule', function(req, res) {
    
    let Matricule = req.params.Matricule;
    model.getSection(Matricule, function(err, result) {
        
        res.json({data: result[0], error: err});
    })
})




module.exports = router;
