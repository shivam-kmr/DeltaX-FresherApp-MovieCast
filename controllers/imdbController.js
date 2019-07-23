const express = require('express');
var router  = express.Router();

const mongoose = require("mongoose");
const IMDB = mongoose.model("imdb");
const ACTOR = mongoose.model("actor");
var assert = require('assert');




//operation for image--------------------start------

const multer = require('multer');
var upload = multer({ dest: 'uploads/' }) 

//operation for image-------------------- end-----

router.get('/',(req,res)=>{
    var resultArray = [];
    mongoose.connect('mongodb://localhost:27017/imdb',{useNewUrlParser:true}, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('actors').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      res.render('imdb/addOrEdit', {items: resultArray, viewTitle : "Insert Movie or TV Show!"});
    });
  });
});

router.get('/get-data', function(req, res, next) {
    var resultArray = [];
    mongo.connect("mongodb://localhost:27017/imdb", function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('actors').find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();
        res.render("imdb/addOrEdit", {items: resultArray, viewTitle : "Insert Movie or TV Show!"});
      });
    });
  });



router.get('/editactor',(req,res)=>{
    res.render("actor/addorEditActor",{
        viewTitle : "Add Actor's!"
    });
});
router.post('/',upload.single('poster'),(req,res,next)=>{
    
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
   
});
router.post('/editactor',upload.single('poster'),(req,res)=>{

    if (req.body._id == '')
        insertRecordOfActor(req, res);
        else
        updateRecordOfActor(req, res);
});

function insertRecord(req,res){
    var imdb = new IMDB();
    
    imdb.movieName = req.body.movieName;
    imdb.yearOfRelease = req.body.yearOfRelease;
    imdb.plot = req.body.plot;
    imdb.cast = req.body.actor;
    imdb.poster=  req.file.path;

    
    imdb.save((err,doc)=>{
    if(!err && req.file){
    imdb.poster=  req.file.path;
    res.redirect('imdb/list');
    }
    else{
        if(err.name== "ValidationError" || !req.file ){
            handleValidationError(err,req.body);
            res.render("imdb/addOrEdit",{
                viewTitle : "Insert Movie",
                imdb : req.body
            });
        }
        console.log("Opps! Error during inserting that movie!"+err);
    }});
}
function updateRecord(req, res) {
    IMDB.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('imdb/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("imdb/addOrEdit", {
                    viewTitle: 'Update Actor',
                    movie: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}
function insertRecordOfActor(req,res){
    var actor = new ACTOR();
    
    actor.actorName = req.body.actorName;
    actor.sex = req.body.sex;
    actor.dateOfBirth = req.body.dateOfBirth;
    actor.bio = req.body.bio;
    actor.poster=  req.file.path;

    actor.save((err,doc)=>{
    if(!err)
    res.redirect('actor/list');
    else{
        if(err.name== "ValidationError"){
            handleValidationErrorActor(err,req.body);
            res.render("actor/addOrEditActor",{
                viewTitle : "Insert Actor",
                actordetails : req.body
            });
        }
        console.log("Opps! Error during inserting that actor!"+err);
    }});
}
function updateRecordOfActor(req, res) {
    ACTOR.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
       
        if (!err) { res.redirect('/imdb/actor/list');}
        else {
            if (err.name == 'ValidationError') {
                handleValidationErrorActor(err, req.body);
                res.render("actor/addOrEditActor", {
                    viewTitle: 'Update Actor',
                    actordetails: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}
//--------------for cast selection-----starts



//--------------for cast selection-----ends


router.get('/list',(req,res,next)=>{
    IMDB.find((err, docs) => {
        if (!err) {
            res.render("imdb/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Movie list :' + err);
        }
    });
});
router.get('/actor/list',(req,res)=>{
    ACTOR.find((err, docs) => {
        if (!err) {
            res.render("actor/actorList", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Actor list :' + err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'movieName':
                body['movieNameError']= err.errors[field].message;
                break;
            case 'yearOfRelease':
                body['yearOfReleaseError']= err.errors[field].message;
                break;
            case 'cast':
                body['castError']= err.errors[field].message;
                break;
            case 'plot':
                body['plotError']= err.errors[field].message;
                break;
            case 'poster':
                body['posterError']= err.errors[field].message;
                break;

            default:
                break;            
        }
    }
 }
function handleValidationErrorActor(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'actorName':
                body['actorNameError']= err.errors[field].message;
                break;
            case 'dateOfBirth':
                body['dateOfBirth']= err.errors[field].message;
                break;
            case 'cast':
                body['sex']= err.errors[field].message;
                break;
            case 'plot':
                body['bio']= err.errors[field].message;
                break;
            case 'poster':
                body['posterError']= err.errors[field].message;
                break;

            default:
                break;            
        }
    }
}

router.get('/:id', (req, res) => {
    IMDB.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("imdb/addOrEdit", {
                viewTitle: "Update Movie Details",
                imdb: doc
            });
        }
    });
});

router.get('/editactor/:id', (req, res) => {
    ACTOR.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("actor/addOrEditActor", {
                viewTitle: "Update Actor Details",
                actor: doc
            });
        }
    });
});

module.exports=router;
