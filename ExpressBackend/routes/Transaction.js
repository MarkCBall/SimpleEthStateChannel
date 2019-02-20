var express = require('express');
var router = express.Router();



var level = require('level')
var db = level('./dbb', {valueEncoding: 'json'})




// POST@(/confirmTx/:CID/:nonce)
// 	//req.body includes sig
// //verify sig is the required countersignature
// //update the signature in the database
// //highestSignedNonce = highestNonce at at Hash(CID) 
// POST@(/proposeNewTx/:CID)
// 	//req.body includes one signature and both new balances
// //verify the signature is valid
// //nonce = highestNonce++ at Hash(CID) 
// //create new data entry at at Hash(CID,Nonce+1) 
// 	u1BalRetained
// 	u2BalRetained
// 	either sig1 or sig2

// GET@(/getTx/:CID/:nonce)
// //returns the Tx details
// GET@(/getHighestNonce/:CID)
// //returns the highest nonce on the specified channel
// GET@(/getHighestSignedNonce/:CID)
// //returns the highest fully signed nonce on the specified channel




module.exports = router;






