

import { ONGOING_CHANNELS } from "../constants/InteractBlockchain";
import { CONTRACT_ADDRESS } from "../constants/Other";
import {ethers} from "ethers";

//let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
let provider = ethers.getDefaultProvider('ropsten');

//get contract info
let StateChannelJson = require('../../SolidityJSON/StateChannels.json')
let StateChannelAbi = StateChannelJson.abi;
//let StateChannelBytecode = StateChannelJson.bytecode


    


export default {

    countersignChannel:(dispatch) => {
        return async (dispatch,getState) => {






            //get wallets --> do this through metamask later?
            let activeWallet = new ethers.Wallet(getState().InteractReduxState.privKey).connect(provider)


            //can deployedcontract be done out of function and connect be done inside?

            //get a contract --> change this to existing contract later
            // let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(activeWallet);
            // let deployedContract = await ContractFactory.deploy()
            let deployedaddress = CONTRACT_ADDRESS
            let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(activeWallet);
            //console.log("deployed contract is ", deployedContract)





            //create the channel

                var ACD = getState().InteractDatabase.ActiveChannelDetails;
                //ACD : Active Channel Detail
                //console.log(getState())

                let CID = getState().InteractReduxState.activeChannel.channel//83;
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


                //remove requested and proposed from database

        }

    },


    initChannelTermination: (dispatch) => {
        return async (dispatch, getState) => {
            
            let activeWallet = new ethers.Wallet(getState().InteractReduxState.privKey).connect(provider)
            let deployedaddress = CONTRACT_ADDRESS
            let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(activeWallet);
                
            var DBData = getState().InteractDatabase;
            console.log(getState())
            let CID = getState().InteractReduxState.activeChannel.channel
            let propTermBlockNum = 6147964 + (4*60*24)// query blockchain for this data later
            let u1Bal = DBData.LatestSignedTxDetails.u1Bal 
            let u2Bal = DBData.LatestSignedTxDetails.u2Bal
            let nonce = DBData.HighestSignedNonce

                // let u1Address = ACD.u1Address//activeWallet.signingKey.address //address
                // //let u2Address = ACD.u2Address//secondwallet.signingKey.address
                // let u1TokenName = ACD.u1TokenName//"Marks" //string memory
                // let u2TokenName = ACD.u2TokenName //"Matts" //string memory
                // let u1InitialTokenBal = ACD.u1InitialTokenBal //50 //uint
                // let u2InitialTokenBal = ACD.u2InitialTokenBal //30 //uint
            
                let v
                let r
                let s


                if (DBData.ActiveChannelDetails.userOneIsMe){
                    v = DBData.LatestSignedTxDetails.sig2.v
                    r = DBData.LatestSignedTxDetails.sig2.r
                    s = DBData.LatestSignedTxDetails.sig2.s
                }else{
                    v = DBData.LatestSignedTxDetails.sig1.v
                    r = DBData.LatestSignedTxDetails.sig1.r
                    s = DBData.LatestSignedTxDetails.sig1.s
                }
                
                
                console.log("inputs are", v, r, s, CID, propTermBlockNum, u1Bal, u2Bal, nonce)
                
                //function InitChannelTermination(uint8 v, bytes32 r, bytes32 s, uint CID, uint proposedTerminatingBlockNumber, uint u1BalRetained, uint u2BalRetained, uint nonce) public{

                deployedContract.InitChannelTermination(
                    v, r, s, CID, propTermBlockNum, u1Bal, u2Bal, nonce
                ).then((x) => console.log("\n\nthen", x))
                .catch((err) => console.log("\n\ncatch", err))

        }
    },



    getOngoingChannels: (dispatch, address) => {
        return async (dispatch) => {

            //move this outside function?
            let deployedaddress = CONTRACT_ADDRESS
            let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider);
            //console.log("deployed contract is ", deployedContract)


            let OngoingChannels = {}
            deployedContract.GetChannelsAtAddress(address)
            .then((BN) => {
                //console.log("\n\nthen", x)
                BN.forEach(  val => {
                    OngoingChannels = {
                        ...OngoingChannels,
                        [val.toString(10)]:val.toString(10)
                    }  
                })
                dispatch({
                        type: ONGOING_CHANNELS,
                        payload: OngoingChannels
                    })
                
            })
            .catch((err) => console.log("\n\ncatch", err))
        
            

            

            // fetch("http://localhost:3001/Channel/pending", {
            //     method: "GET",
            //     mode: "cors", 
            //     headers: {
            //         "address":address
            //     }
            // }).then((response) =>{
            //     return response.json()
            // }).then((response) => {
            //     
            // })
        }
    },

}