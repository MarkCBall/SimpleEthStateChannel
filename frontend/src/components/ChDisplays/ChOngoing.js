import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";
import Initial from "./SubChDisplays/Initial";
import Countersigned from "./SubChDisplays/Countersigned";
import HalfSigned from "./SubChDisplays/HalfSigned";
// import CurrentBalances from "../ContractInfo/CurrentBalances";
// import InitialBalances from "../ContractInfo/InitialBalances";
// import CountersignTx from "../CountersignTx";
//import ProposeNewTx from "../ProposeNewTx";

//relative imports
import "./ChOngoing.css";

import {ethers} from "ethers";



class ChOngoing extends Component {
    constructor(props) {
        super(props);
        this.state = {

          u1Bal:0,
          u2Bal:0
        }
    }

    handleU1Change = (event) => {
        let u1Bal = Number(event.target.value)
        if ((u1Bal >=0) && (u1Bal <= Number(this.props.u1InitialTokenBal))){
            this.setState({
                ...this.state,
                u1Bal:u1Bal
            })
        }
        
    }
    handleU2Change = (event) => {
        let u2Bal = Number(event.target.value)
        if ((u2Bal >=0)  && (u2Bal <= Number(this.props.u2InitialTokenBal))){
            this.setState({
                ...this.state,
                u2Bal:u2Bal
            })
        }
    }

  




        //bytes32 TxHash = keccak256(abi.encodePacked(CID,nonce,u1BalRetained,u2BalRetained));
        signNewTxData = async (u1BalRetained,u2BalRetained) => {
            //console.log(this.props.activeChannelNum,this.props.HighestNonce,u1BalRetained,u2BalRetained)
    
            //generate the hash to sign based on channel details
            let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
                ['uint', 'uint', 'uint', 'uint'],
                [
                    this.props.activeChannelNum,
                    this.props.HighestNonce,
                    u1BalRetained,
                    u2BalRetained
                ]
            );
            let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)
    
            let firstwallet = new ethers.Wallet(this.props.privateKey)
            let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)//.then(console.log)
            let sig = ethers.utils.splitSignature(flatSig);
            //console.log(sig)
            return sig
        }
    
     
    
        SubmitAndSign = async () => {
            var body;
            if (this.props.userOneIsMe){
                body = {
                    sig1: await this.signNewTxData(this.state.u1Bal,this.state.u2Bal),
                    u1Bal:this.state.u1Bal,
                    u2Bal:this.state.u2Bal
                }
            }
            else{
                body = {
                    sig2: await this.signNewTxData(this.state.u1Bal,this.state.u2Bal),
                    u1Bal:this.state.u1Bal,
                    u2Bal:this.state.u2Bal
                }
            }
            fetch("http://35.183.188.67:3001/Transaction/new", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "cid":this.props.activeChannelNum,
                    },
                    body: JSON.stringify(body)
                })
                .then("success",console.log)
                .catch("failure",console.log)
    
        }

        


       
    



        


    

    render() {
        return (
            <div>
                <Initial/>
                
                {(Number(this.props.HighestSignedNonce) > 0) &&
                    <Countersigned/>
                }

                {(Number(this.props.HighestNonce) > Number(this.props.HighestSignedNonce)) &&
                    <HalfSigned/>
                }
                






                <div className="row">
                    <div className="col-4 col-solid">
                        Make new Tx Offer (Button)
                        <br/>
                        <button className="btn btn-success" onClick={() => this.SubmitAndSign()}> submit and sign</button>
                    </div>
                    <div className="col-4 col-solid">
                        <input 
                            type="text" 
                            size="2"
                            onChange={ this.handleU1Change   }
                            value={this.state.u1Bal}
                        />
                        {" "+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2InitialTokenBal-this.state.u2Bal+""+this.props.u2TokenName} tokens
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1InitialTokenBal-this.state.u1Bal+""+this.props.u1TokenName} tokens
                        <br/>
                        <input 
                            type="text" 
                            size="2"
                            onChange={ this.handleU2Change   }
                            value={this.state.u2Bal}
                        />
                        {" "+this.props.u2TokenName} tokens
                    </div>
                </div>



                <br/><br/>
                <button 
                    className="btn btn-danger"
                    onClick={this.props.initChannelTermination}
                > Initialize channel termination
                </button>
                <br/>Terminating block#: Countdown___ submitted on nonce#:




            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        state:state,

        activeChannelNum: state.InteractReduxState.activeChannel.channel,
        privateKey : state.InteractReduxState.privKey,

        //userOneIsMe,u1Address, u1InitialTokenBal,u1Sig OR u2Sig, u1TokenName.. same for u2
        ...state.InteractDatabase.ActiveChannelDetails,
        
        HighestNonce:state.InteractDatabase.HighestNonce,
        HighestSignedNonce:state.InteractDatabase.HighestSignedNonce,

        u1BalSigned:state.InteractDatabase.LatestSignedTxDetails.u1Bal,
        u2BalSigned:state.InteractDatabase.LatestSignedTxDetails.u2Bal,
        sig1Signed:state.InteractDatabase.LatestSignedTxDetails.sig1,
        sig2Signed:state.InteractDatabase.LatestSignedTxDetails.sig2,

        u1BalUnconfirmed:state.InteractDatabase.LatestTxDetails.u1Bal,
        u2BalUnconfirmed:state.InteractDatabase.LatestTxDetails.u2Bal,
        sig1Unconfirmed:state.InteractDatabase.LatestTxDetails.sig1,
        sig2Unconfirmed:state.InteractDatabase.LatestTxDetails.sig2,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initChannelTermination: () => {
            dispatch(InteractBlockchain.initChannelTermination(dispatch))     
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChOngoing);
