

var express = require('express');

const multer = require('multer');

var dateFormat = require('dateformat')

var app = express();

var router = express.Router();


const storage = multer.diskStorage({
    destination : (req , file, callBack) => {
     callBack(null, 'public/images')
     
    
   },
     filename: (req, file , callBack) => {
      callBack(null,  file.originalname )
       }
   })
   
  var upload = multer({ storage: storage })
  
//var upload = multer({dest:'uploads/'});

router.post('/file', upload.single('file'), (req,res,next) => {
  let currentDate = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss');
  console.log('data',currentDate)
    const file = req.file
    console.log(file.filename);
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
   
    res.send(file)
  })


  

  

  module.exports = app;

module.exports = router;