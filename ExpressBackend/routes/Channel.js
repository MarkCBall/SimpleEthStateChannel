var express = require('express');
var router = express.Router();

var level = require('level')
var db = level('./db', {valueEncoding: 'json'})



router.post('/', function(req, res, next) {
    //EXAMPLE req.body
    // {   "CID":1,
    //     "u1Address":"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87",
    //     "u2Address": "0x222",
    //     "u1TokenName": "Marks",
    //     "u2TokenName": "Matts",
    //     "u1InitialTokenBal": 50,
    //     "u2InitialTokenBal": 30,
    //     "u1Sig":"873287323287328732873287328732"
    // }

    var CID = req.body.CID
    delete req.body.CID
    //should/could CID be sent in header?

    db.put("pending"+req.body.u1Address,CID)
    db.put("requested"+req.body.u2Address,CID)

    // db.get("pending"+req.body.u1Address).then(console.log)
    // console.log("pending"+req.body.u1Address)
    //db.get("pending0x111").then(console.log)
        
//verify CID doesn't exist yet
//verify that sig1 correlates to all given channel info

//create a new entry at CID
db.put(CID,req.body)

    //db.get(CID).then(console.log)
  res.render('index', { title: 'Post completed correctly' });//clean this line later
});





router.get('/', async function(req, res, next) {
    //EXAMPLE req.body 
    //{cid:1}
    var CID = req.headers.cid
    //res.setHeader('Content-Type', 'application/json');
    var dbData = await db.get(CID);
    //TODO -- if dbData has error, handle error

    res.send(dbData)
});

//router.delete('/', function(req, res, next) {
//complete this later









router.get('/pending', async function(req, res, next) {
    //var CIDs = await db.get("pending"+req.headers.address)
    var CIDs = await db.get("pending0x111")
    res.send({1:true});//JSON.stringify(CIDs))
});

router.get('/requested', async function(req, res, next) {
    var CIDs = await db.get("requested"+req.headers.address)
    //WHAT FORM DOES THIS SEND DATA IN? {1:true, 2:true ect}???
    res.send(JSON.stringify(CIDs))
});


module.exports = router;






