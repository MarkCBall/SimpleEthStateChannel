//run this file to text interaction with contract deployed to testnet using remix
//as the server or frontend would interact with it
const ethers = require('ethers');

let provider = ethers.getDefaultProvider('ropsten');
//console.log("provider is",provider)

let phrase = "example exile argue silk regular smile grass bomb merge arm assist farm"
let path = "m/44'/60'/0'/0/"

let firstwallet = ethers.Wallet.fromMnemonic(phrase).connect(provider);
firstwallet.getBalance().then((BN) => console.log(BN.toString(10)/ 1000000000000000000 , " eth balance in firstwallet"))
console.log("firstwallet address is", firstwallet.signingKey.address,"\n")
console.log("firstwallet private key is", firstwallet.signingKey.privateKey,"\n")

let secondwallet = ethers.Wallet.fromMnemonic(phrase, path+"1").connect(provider);
secondwallet.getBalance().then((BN) => console.log(BN.toString(10)/ 1000000000000000000 , " eth balance in secondwallet"))
console.log("secondwallet address is", secondwallet.signingKey.address,"\n")
console.log("secondwallet private key is", secondwallet.signingKey.privateKey,"\n")


// let GreeterJson = require('../dist/contracts/Greeter.json');
let StateChannelJson = require ('./build/contracts/StateChannels.json')
//console.log("contract json is ", StateChannelJson)
let StateChannelAbi = StateChannelJson.abi;
//console.log("abi is ", StateChannelAbi)

let deployedaddress = "0xE802cA7b7D9F3b9df1CB1f772444cFe2dC3C7A47"

let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(secondwallet);
//console.log("deployed contract is ", deployedContract)

(async () => {

    let u2Address = secondwallet.signingKey.address

    let CID = 83; //uint
    let u1Address = firstwallet.signingKey.address //address
    let u1TokenName ="Marks" //string memory
    let u2TokenName = "Matts" //string memory
    let u1InitialTokenBal = 50 //uint
    let u2InitialTokenBal = 30 //uint


    // console.log(
    //     ethers.utils.solidityKeccak256(['uint','uint'],[1,1])
    // )
 
    
    //83,"0xB8D851486d1C953e31A44374ACa11151D49B8bb3","Marks","Matts",50,30
    hashedEncodedChannelData = ethers.utils.solidityKeccak256(
        ['uint','address','address','string','string','uint','uint'],
        [CID,u1Address,u2Address,u1TokenName,u2TokenName,u1InitialTokenBal,u2InitialTokenBal]
    );

    console.log(hashedEncodedChannelData)


    let flatSig = await firstwallet.signMessage(hashedEncodedChannelData)//.then(console.log)
    // let flatSig = await firstwallet.signMessage(CID,u1Address,u2Address,u1TokenName,u2TokenName,u1InitialTokenBal,u2InitialTokenBal)
    let sig = ethers.utils.splitSignature(flatSig);
    let v1 = sig.v //uint8
    let r1 = sig.r //bytes32
    let s1 = sig.s//bytes32

    console.log(
        await deployedContract.CreateChannel(
            v1,r1,s1,CID,u1Address,u1TokenName,u2TokenName,u1InitialTokenBal,u2InitialTokenBal
        ).catch(console.log)
    )
         

})()



// let deployedaddress = GreeterJson.deployedAddress
// //console.log(deployedaddress.)
// let contractabi = GreeterJson.abiDefinition
// const deployedContract = new ethers.Contract(deployedaddress,contractabi,provider).connect(firstwallet);

// //console.log(deployedContract)

// //deployedContract.greet().then(console.log);
// (async () => {
//     console.log(await deployedContract.greet())
// })()


// //big number stuff should be demo'd below