




    


export default {

    countersignChannel:(dispatch) => {
        return async (dispatch,getState) => {

            const ethers = require('ethers')


            let deployedContract


            //init ethers
            let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

            //get contract info
            let StateChannelJson = require('../../SolidityJSON/StateChannels.json')
            let StateChannelAbi = StateChannelJson.abi;
            let StateChannelBytecode = StateChannelJson.bytecode

            //get wallets --> do this through metamask later?
            let firstwallet = new ethers.Wallet(getState().InteractReduxState.privKey).connect(provider)



            //get a contract --> change this to existing contract later
            let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(firstwallet);
            deployedContract = await ContractFactory.deploy()
            //let deployedaddress = "0xE802cA7b7D9F3b9df1CB1f772444cFe2dC3C7A47"
            //let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(secondwallet);
            //console.log("deployed contract is ", deployedContract)





            //create the channel

                var ACD = getState().InteractDatabase.ActiveChannelDetails;
                //console.log(getState())

                let CID = getState().InteractReduxState.activeChannel//83;
                //CID FROM ACD


                let u1Address = ACD.u1Address//firstwallet.signingKey.address //address
                //let u2Address = ACD.u2Address//secondwallet.signingKey.address
                let u1TokenName = ACD.u1TokenName//"Marks" //string memory
                let u2TokenName = ACD.u2TokenName //"Matts" //string memory
                let u1InitialTokenBal = ACD.u1InitialTokenBal //50 //uint
                let u2InitialTokenBal = ACD.u2InitialTokenBal //30 //uint
                let v1 = ACD.u1Sig.v
                let r1 = ACD.u1Sig.r
                let s1 = ACD.u1Sig.s
                
                
                

                //console.log(u1Address)
                //console.log(firstwallet.signingKey.address)
                //console.log(ACD)
                //console.log("deployedcontract ")



                deployedContract.CreateChannel(
                    v1, r1, s1, CID, u1Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal
                ).then((x) => console.log("\n\nthen", x))
                .catch((err) => console.log("\n\ncatch", err))

        }

    },

}