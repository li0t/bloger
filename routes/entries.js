var express = require('express');
var router = express.Router();

var Entry = require('../Entry.js');


/*GET ALL ENTRIES*/
router.get('/', function(req, res, next) {
  res.render('entry');
});

/*CREATE A NEW ENTRY*/
router.post('/', function(req, res, next) {
    var entry = {
            title : req.body.title,
            content : req.body.content,
            date : new Date()  
    };
  Entry.create(entry, function(err, entr) { 
    if(err) res.render('error', {error : err});
    res.redirect('/');
  });
});

/*RENDER SUBMIT ENTRY TEMPLATE*/
router.get('/new', function(req, res, next) {
  res.render('newEntry');
});

/*GET ONE ENTRY*/
router.get('/:id', function(req, res, next) {
  Entry.findById(req.params.id , function(err, entr) {
    if(err) res.render('error', {error : err});
    res.render('entry' , {entry : entr});
  });
});

/*DELETE AN ENTRY*/
router.delete('/:id', function(req, res, next) {
    Entry.findByIdAndRemove(req.params.id, function(err, entry){
        if(err) res.render('error', {error : err});
        res.json(entry);
    });
});



/*RENDER EDIT ENTRY TEMPLATE*/
router.get('/edit/:id', function(req, res, next) {
  Entry.findById(req.params.id , function(err, entr) {
    if(err) res.render('error', {error : err});
     res.render('edit', {entry : entr});
  }); 
});

/*UPDATE ENTRY / DOES NOT RETURN THE VALUE SAVED*/
/*router.post('/edit/:id', function(req, res, next) {
  Entry.findOne({_id : req.params.id}, function (err, entry) {
    if(err) res.render('error', {error : err});  
    entry.title = req.body.title;
    entry.content = req.body.content;
    entry.save(function (err) {
      if(err) res.render('error', {error : err});
      res.redirect('/');
    });
  });
});*/

/*UPDATE ENTRY / RETURNS THE VALUE SAVED*/
router.post('/edit/:id', function(req, res, next) {
  Entry.findOneAndUpdate({_id : req.params.id}, req.body, function (err, entry) {
     if(err) res.render('error', {error : err});  
      res.redirect('/');
    });
  });

module.exports = router;
