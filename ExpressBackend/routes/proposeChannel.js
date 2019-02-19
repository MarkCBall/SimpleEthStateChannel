var express = require('express');
var router = express.Router();

var level = require('level')
var db = level('./db', {valueEncoding: 'json'})


/* GET home page. */
router.get('/', function(req, res, next) {
    db.put('animal',{type:'bear'})

        //req.body includes all channel details and sig1
//verify CID doesn't exist yet
//verify that sig1 correlates to all given channel info
//create a new entry at CID

    db.get('animal').then(console.log)

  res.render('index', { title: 'Express' });
});

module.exports = router;






