var express = require('express');
var router = express.Router();



var level = require('level')
var db = level('./db', {valueEncoding: 'json'})




router.get('/pending', async function(req, res, next) {

    
    //console.log(req.headers.address)
    console.log("yep")
    
    var CIDs = await db.get("pending0x111")//"pending"+req.headers.address)

    res.send(CIDs)
});

// router.get('/requested', async function(req, res, next) {

//     //res.setHeader('Content-Type', 'application/json');
//     var dbData = await db.get(CID);
//     //TODO -- if dbData has error, handle error

//     res.send(dbData)
// });




module.exports = router;






