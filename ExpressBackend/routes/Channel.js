var express = require('express');
var router = express.Router();

var level = require('level')
var db = level('./db', {valueEncoding: 'json'})



router.post('/', async function(req, res, next) {
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

    delete req.body.CID//alternatively put CID in the header - better solution..

    var address1 = req.body.u1Address;
    var address2 = req.body.u2Address;

    //if pending == null or error, set to ""
    var pendingKey = await db.get("pending"+address1);
    var requestedKey = await db.get("requested"+address2);
    

    db.put("pending"+address1,{...pendingKey,[CID]:CID})
    db.put("requested"+address2,{...requestedKey,[CID]:CID})
        
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
    db.get("pending"+req.headers.address)
    .then((CIDs) => { res.send(JSON.stringify(CIDs))}   )
    .catch((error) => res.send(JSON.stringify({1:1}))  )
    //handle the errors in a better way?
    
});

router.get('/requested', async function(req, res, next) {
    var CIDs = await db.get("requested"+req.headers.address)
    //WHAT FORM DOES THIS SEND DATA IN? {1:true, 2:true ect}???
    res.send(JSON.stringify(CIDs))
});


module.exports = router;






