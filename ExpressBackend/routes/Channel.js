var express = require('express');
var router = express.Router();

var level = require('level')
var db = level('./db', {valueEncoding: 'json'})



router.post('/', function(req, res, next) {
    //EXAMPLE req.body
    // {   "CID":1,
    //     "u1Address":"0x111",
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

        
//verify CID doesn't exist yet
//verify that sig1 correlates to all given channel info

//create a new entry at CID
db.put(CID,req.body)

    db.get(CID).then(console.log)

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



module.exports = router;






