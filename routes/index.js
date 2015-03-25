var express = require('express');
var router = express.Router();

var Entry = require('../Entry.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var entries = false;
    Entry.find(function(err, entrs){
      if(err) console.log('Error! : ' + err);
      if(entrs.length  > 0) entries = entrs;
      res.render('index' , {title: 'Bloger' , entries : entries});
    });
});


module.exports = router;
