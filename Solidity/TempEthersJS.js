(async () => {

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