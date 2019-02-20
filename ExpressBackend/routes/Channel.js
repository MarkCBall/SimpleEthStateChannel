var express = require('express');
var router = express.Router();


// (async ()=>{
//     db.close(db)
// })()
//level.repair('./db')


var level = require('level')

var db = level('./dbb', {valueEncoding: 'json'})



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



    var pendingKey;
    db.get("pending"+address1)
    .then((res)=> {pendingKey = res;})
    .catch((err) => {console.log(err);pendingKey = {};})
    
    var requestedKey;
    db.get("requested"+address1)
    .then((res)=> {requestedKey = res;})
    .catch((err) => {requestedKey = {};})

    db.put("pending"+address1,{...pendingKey,[CID]:CID})
    //.then(console.log("\n\npending success"))
    .catch((err) => console.log("\n\npending failed",err))
    db.put("requested"+address2,{...requestedKey,[CID]:CID})
    //.then(console.log("\n\nrequested success"))
    .catch((err) => console.log("\n\nrequested failed",err))
        
    //verify CID doesn't exist yet
    //verify that sig1 correlates to all given channel info

    //create a new entry at CID
    db.put(CID,req.body)
    //.then(console.log("\n\n CIDput success"))
    .catch((err) => console.log("\n\n CIDput failed",err))

  res.render('index', { title: 'Post completed correctly' });//clean this line later
});





router.get('/', async function(req, res, next) {
    //EXAMPLE req.body 
    //{cid:1}
    var CID = req.headers.cid
    db.get(CID)
    .then((dbres) => res.send(dbres))
    .catch((err) => {
        res.send({});
        console.log(err)
    })
});

//router.delete('/', function(req, res, next) {
//complete this later









router.get('/pending', async function(req, res, next) {
    db.get("pending"+req.headers.address)
    .then((CIDs) => { res.send(JSON.stringify(CIDs))}   )
    .catch((error) => res.send(JSON.stringify({}))  )
});

router.get('/requested', async function(req, res, next) {
    db.get("requested"+req.headers.address)
    .then((CIDs) => { res.send(JSON.stringify(CIDs))}   )
    .catch((error) => res.send(JSON.stringify({}))  )
});


module.exports = router;






