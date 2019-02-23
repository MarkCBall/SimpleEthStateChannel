(async () => {

//     Available Accounts
// ==================
// (0) 0xb8d851486d1c953e31a44374aca11151d49b8bb3 (~100 ETH)
// (1) 0xf6d5c6d500cac10ee7e6efb5c1b479cfb789950a (~100 ETH)
// (2) 0xf09324e7a1e2821c2f7a4a47675f9cf0b1a5eb7f (~100 ETH)
// (3) 0xfbaf82a227dcebd2f9334496658801f63299ba24 (~100 ETH)
// (4) 0x774b5341944deac70199a4750556223cb008949b (~100 ETH)
// (5) 0x4801428dad07e7c2401d033d195116011fc4e400 (~100 ETH)
// (6) 0xcf08befbc01a5b02ea09d840797d6b4565d4d535 (~100 ETH)
// (7) 0x1a2f3b98e434c02363f3dac3174af93c1d690914 (~100 ETH)
// (8) 0x4a17f35f0a9927fb4141aa91cbbc72c1b31598de (~100 ETH)
// (9) 0xdf18cb4f2005bc52f94e9bd6c31f7b0c6394e2c2 (~100 ETH)

// Private Keys
// ==================
// (0) 0xf942d5d524ec07158df4354402bfba8d928c99d0ab34d0799a6158d56156d986
// (1) 0x88f37cfbaed8c0c515c62a17a3a1ce2f397d08bbf20dcc788b69f11b5a5c9791
// (2) 0xf4ebc8adae40bfc741b0982c206061878bffed3ad1f34d67c94fa32c3d33eac8
// (3) 0xca67021a16478270ede4fddd65d0c031c75cd36c13b6a56bcb767928c1c2cf86
// (4) 0x9955b1e01b2a7d8c22df41754d48b08dff3c0f3dd79d43e091c6311f97f0605a
// (5) 0x130137aa9a7fbc7cadc98c079cda47a999ff41931d9feaab621855beceed71f7
// (6) 0xead83d04f741d2b3ab50be1299c18aa1a82c241606861a9a6d3122443496522d
// (7) 0xe6e893ac9f1c1db066a8a83a376554084b0a786e4cdcd91559d68bd4a1dac396
// (8) 0xf1023ac6c8695f6ceb5331a382be8846bfe078b22c18ad7ef4fc3ea6e1cc59e4
// (9) 0x4aef59c2cf29479b2c27a5f208e6b89d65d16f4977988151e135460db8274fdb




    //run this file to text interaction with contract deployed to testnet using remix as the server or frontend would interact with it

    //ganache-cli --mnemonic "example exile argue silk regular smile grass bomb merge arm assist farm"

    const ethers = require('ethers')

    //let provider = ethers.getDefaultProvider('ropsten');
    let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    //console.log("provider is",provider)

    let phrase = "example exile argue silk regular smile grass bomb merge arm assist farm"
    let path = "m/44'/60'/0'/0/"

    let firstwallet = ethers.Wallet.fromMnemonic(phrase).connect(provider);
    // firstwallet.getBalance().then((BN) => console.log(BN.toString(10) / 1000000000000000000, " eth balance in firstwallet"))
    // console.log("firstwallet address is", firstwallet.signingKey.address, "\n")
    // console.log("firstwallet private key is", firstwallet.signingKey.privateKey, "\n")

    let secondwallet = ethers.Wallet.fromMnemonic(phrase, path + "1").connect(provider);
    // secondwallet.getBalance().then((BN) => console.log(BN.toString(10) / 1000000000000000000, " eth balance in secondwallet"))
    // console.log("secondwallet address is", secondwallet.signingKey.address, "\n")
    // console.log("secondwallet private key is", secondwallet.signingKey.privateKey, "\n")


    let StateChannelJson = require('./build/contracts/StateChannels.json')
    //console.log("contract json is ", StateChannelJson)
    let StateChannelAbi = StateChannelJson.abi;
    //console.log("abi is ", StateChannelAbi)
    let StateChannelBytecode = StateChannelJson.bytecode


    let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(secondwallet);
    //console.log("factory is" ,ContractFactory)

    let deployedContract = await ContractFactory.deploy()
    //console.log("deployed contract is ", deployedContract)
    //console.log("deployed contract address is ", deployedContract.address)

    //let deployedaddress = "0xE802cA7b7D9F3b9df1CB1f772444cFe2dC3C7A47"
    //let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(secondwallet);
    //console.log("deployed contract is ", deployedContract)



    let u2Address = secondwallet.signingKey.address

    let CID = 83; //uint
    let u1Address = firstwallet.signingKey.address //address
    let u1TokenName = "Marks" //string memory
    let u2TokenName = "Matts" //string memory
    let u1InitialTokenBal = 50 //uint
    let u2InitialTokenBal = 30 //uint


    
    hashedEncodedChannelData = ethers.utils.solidityKeccak256(
        ['uint', 'address', 'address', 'string', 'string', 'uint', 'uint'],
        [CID, u1Address, u2Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal]
    );

    //console.log("node's hashed data is ",hashedEncodedChannelData)

    ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

    let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)//.then(console.log)
    let sig = ethers.utils.splitSignature(flatSig);
    let v1 = sig.v //uint8
    let r1 = sig.r //bytes32
    let s1 = sig.s//bytes32
    //console.log(sig)



    // //generate a signed transaction that can be posted with postman
    // let unsignedTx ={
    //     value:ethers.utils.bigNumberify(100),
    //     gasPrice:ethers.utils.bigNumberify(20000000000),
    //     gasLimit:ethers.utils.bigNumberify(158478),
    //     to:u2Address,
    //     nonce: ethers.utils.bigNumberify(await secondwallet.getTransactionCount('pending')),
    //     //data:
    // }
    // console.log("tx details are ",unsignedTx)
    // console.log("\npost the following to infura with postman ", await secondwallet.sign(unsignedTx))



    await deployedContract.CreateChannel(
        v1, r1, s1, CID, u1Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal
    )//.then((x) => console.log("\n\nthen", x))
    .catch((err) => console.log("\n\ncatch", err))


    //deployedContract.hackyStateOutput3().then((x) => console.log("contracts calculated address is ", x))

    



})()