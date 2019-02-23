

const ethers = require('ethers')
//init ethers
//let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
let provider = ethers.getDefaultProvider('ropsten');

//get contract info
let StateChannelJson = require('../../SolidityJSON/StateChannels.json')
let StateChannelAbi = StateChannelJson.abi;
let StateChannelBytecode = StateChannelJson.bytecode


    


export default {

    countersignChannel:(dispatch) => {
        return async (dispatch,getState) => {






            //get wallets --> do this through metamask later?
            let activeWallet = new ethers.Wallet(getState().InteractReduxState.privKey).connect(provider)



            //get a contract --> change this to existing contract later
            // let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(activeWallet);
            // let deployedContract = await ContractFactory.deploy()
            let deployedaddress = "0x7034cC3eeDf27AC3f96599F0dD0de74A7960285B"
            let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(activeWallet);
            //console.log("deployed contract is ", deployedContract)





            //create the channel

                var ACD = getState().InteractDatabase.ActiveChannelDetails;
                //console.log(getState())

                let CID = getState().InteractReduxState.activeChannel//83;
                //CID FROM ACD


                let u1Address = ACD.u1Address//activeWallet.signingKey.address //address
                //let u2Address = ACD.u2Address//secondwallet.signingKey.address
                let u1TokenName = ACD.u1TokenName//"Marks" //string memory
                let u2TokenName = ACD.u2TokenName //"Matts" //string memory
                let u1InitialTokenBal = ACD.u1InitialTokenBal //50 //uint
                let u2InitialTokenBal = ACD.u2InitialTokenBal //30 //uint
                let v1 = ACD.u1Sig.v
                let r1 = ACD.u1Sig.r
                let s1 = ACD.u1Sig.s
                
                
                

                //console.log(u1Address)
                //console.log(activeWallet.signingKey.address)
                //console.log(ACD)
                //console.log("deployedcontract ")



                deployedContract.CreateChannel(
                    v1, r1, s1, CID, u1Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal
                ).then((x) => console.log("\n\nthen", x))
                .catch((err) => console.log("\n\ncatch", err))


                //remove requested from database

        }

    },

}