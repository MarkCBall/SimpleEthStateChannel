import { COUNTERSIGN_CHANNEL } from "../constants/InteractBlockchain";
import { TERMINATE_CHANNEL } from "../constants/InteractBlockchain";
import { WITHDRAW_FROM_CHANNEL } from "../constants/InteractBlockchain";


let v1
let r1
let s1
let CID
let u1Address
let u2Address
let u1TokenName
let u2TokenName
let u1InitialTokenBal
let u2InitialTokenBal
let deployedContract


    //init ethers
    const ethers = require('ethers')
    let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

//get contract info
    let StateChannelJson = require('../../SolidityJSON/StateChannels.json')
    let StateChannelAbi = StateChannelJson.abi;
    let StateChannelBytecode = StateChannelJson.bytecode

//get wallets --> do this through metamask later?
    let phrase = "example exile argue silk regular smile grass bomb merge arm assist farm"
    let path = "m/44'/60'/0'/0/"
    let firstwallet = ethers.Wallet.fromMnemonic(phrase).connect(provider);
    let secondwallet = ethers.Wallet.fromMnemonic(phrase, path + "1").connect(provider);


//REMOVE THIS LATER
(async () => {

//get a contract --> change this to existing contract later
    let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(secondwallet);
     deployedContract = await ContractFactory.deploy()
    //let deployedaddress = "0xE802cA7b7D9F3b9df1CB1f772444cFe2dC3C7A47"
    //let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(secondwallet);
    //console.log("deployed contract is ", deployedContract)
     

})()

var signChannelData = async (CID, u1Address, u2Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal) => {
    let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
        ['uint', 'address', 'address', 'string', 'string', 'uint', 'uint'],
        [CID, u1Address, u2Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal]
    );
    let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

    let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)//.then(console.log)
    let sig = ethers.utils.splitSignature(flatSig);
     v1 = sig.v //uint8
     r1 = sig.r //bytes32
     s1 = sig.s//bytes32
     return sig
}

    


export default {

    countersignChannel:(dispatch) => {
        return (dispatch,getState) => {
            //create the channel

                var ACD = getState().InteractDatabase.ActiveChannelDetails;
                //console.log(getState())

                CID = getState().InteractReduxState.activeChannel//83;
                //CID FROM ACD

                u1Address = ACD.u1Address//firstwallet.signingKey.address //address
                u2Address = ACD.u2Address//secondwallet.signingKey.address
                u1TokenName = ACD.u1TokenName//"Marks" //string memory
                u2TokenName = ACD.u2TokenName //"Matts" //string memory
                u1InitialTokenBal = ACD.u1InitialTokenBal //50 //uint
                u2InitialTokenBal = ACD.u2InitialTokenBal //30 //uint

                console.log(u1Address)
                console.log(firstwallet.signingKey.address)
                console.log(ACD)

            //THIS SHOULD BE DONE BY u1 NOT u2 in propose channel
                // signChannelData(CID, u1Address, u2Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal)
                // .then(console.log)

                // deployedContract.CreateChannel(
                //     v1, r1, s1, CID, u1Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal
                // )//.then((x) => console.log("\n\nthen", x))
                // .catch((err) => console.log("\n\ncatch", err))

        }

    },

}