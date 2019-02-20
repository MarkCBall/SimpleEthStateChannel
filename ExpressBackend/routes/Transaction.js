var express = require('express');
var router = express.Router();

var level = require('level')
var db = level('./dbTransactions', {valueEncoding: 'json'})

router.post('/new', async function(req, res, next) {
    //EXAMPLE req.header {CID:5}
    //EXAMPLE req.body
    // {    sig1: ""   OR sig2: ""
    //      u1Bal: 2
    //      u2Bal: 35
    // }

    //verify the signature is valid
    //nonce = highestNonce++ at Hash(CID)
    var highestNonce = 0;
    var CID = req.headers.cid;
    //console.log(CID)
    highestNonce = await db.get("HighestNonce"+CID)
    .catch(() => {return 0})
 
    var data = req.body;
    console.log("data is", data)
    var nextNonce = highestNonce+1;
    console.log("now using nonce # ",nextNonce )

    db.put("HighestNonce"+CID,nextNonce)
    .catch(console.log)

    //create new data entry at at Hash(CID,Nonce+1) 
    db.put(CID+""+nextNonce,data)
    .catch(console.log)
    res.render('index', { title: 'Post completed correctly' });//clean this line later
});


router.get('/HighestNonce', async function(req, res, next) {
    //EXAMPLE req.header {CID:5}
    var CID = req.headers.cid;
    db.get("HighestNonce"+CID)
    .then((dbres) => {
        res.send(JSON.stringify(dbres))
        //console.log(dbres)
     })
    .catch((err) => {
        res.send(JSON.stringify(0))
        //console.log(err)
    })
});

router.get('/getTx', async function(req, res, next) {
    //EXAMPLE req.header {CID:5, nonce:2}
    var CID = req.headers.cid;
    var nonce = req.headers.nonce;
    console.log(CID,"xx",nonce)
    db.get(CID+""+nonce)
    .then((dbres) => {
        res.send(JSON.stringify(dbres))
        console.log("dbres is", dbres)
     })
    .catch((err) => {
        res.send(JSON.stringify(0))
        console.log("error is",err)
    })
});



// // POST@(/confirmTx/:CID/:nonce)
// // 	//req.body includes sig
// // //verify sig is the required countersignature
// // //update the signature in the database
// // //highestSignedNonce = highestNonce at at Hash(CID) 



// // GET@(/getHighestSignedNonce/:CID)
// // //returns the highest fully signed nonce on the specified channel




module.exports = router;






