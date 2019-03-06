import React, { Component } from "react";
import { connect } from "react-redux";
//import InteractReduxState from "../redux/actions/InteractReduxState";

//make this an import???
const ethers = require('ethers')

class CountersignTx extends Component {

    sig1Undefined = () => {
        return this.props.sig1===undefined;
    }

    //refactor into a library - this logic is done elsewhere also?
    signTxData = async () => {
        // console.log(this.props.CID,
        //     this.props.HighestNonce,
        //     this.props.u1Bal,
        //     this.props.u2Bal)

        //generate the hash to sign based on channel details
        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['uint', 'uint', 'uint', 'uint'],
            [
                this.props.CID,
                this.props.HighestNonce,
                this.props.u1Bal,
                this.props.u2Bal
            ]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

        let firstwallet = new ethers.Wallet(this.props.privateKey)
        let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)//.then(console.log)
        let sig = ethers.utils.splitSignature(flatSig);
        console.log("countersignTxSig",sig)
        return sig
    }

    countersignAndPostToDatabase = async () =>{
        
        // var u1Bal=this.props.u1Bal;
        // var u2Bal=this.props.u2Bal;

        var body;
        if (this.props.userOneIsMe){
            body = {
                sig1: await this.signTxData() //   "put functioncall here - second signer"
            }
        }
        else{
            body = {
                sig2: await this.signTxData()//"put functioncall here - second signer"
            }
        }

        fetch("http://35.183.188.67:3001/Transaction/confirm", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "cid":this.props.CID,
                "nonce":this.props.HighestNonce
            },
            body: JSON.stringify(body)
        })
        .then("success",console.log)
        .catch("failure",console.log)
    }

    isReadyToCountersign = () =>{
        if (this.props.HighestNonce>this.props.HighestSignedNonce){
            if (
                    (this.sig1Undefined() && this.props.userOneIsMe) ||
                    ((!this.sig1Undefined()) && !this.props.userOneIsMe)){
                   return true;
               }
        } 
        return false


    }


    render() {
        return (
            <div>

                Latest nonce for the channel is:
                {this.props.HighestNonce}
                <br/>
                You may sign the following transaction: <br/> (only display if your sig is missing)<br/>
                u1Bal:{this.props.u1Bal}<br/>
                u2Bal:{this.props.u2Bal}<br/>

                {this.isReadyToCountersign() &&
                    <button 
                        onClick={this.countersignAndPostToDatabase} 
                        className="btn btn-success"
                    >
                        countersign
                    </button>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        CID: state.InteractReduxState.activeChannel.channel,
        HighestNonce: state.InteractDatabase.HighestNonce,
        HighestSignedNonce: state.InteractDatabase.HighestSignedNonce,
        u1Bal:state.InteractDatabase.LatestTxDetails.u1Bal,
        u2Bal:state.InteractDatabase.LatestTxDetails.u2Bal,
        // txDetails:state.InteractDatabase.LatestTxDetails,
        sig1:state.InteractDatabase.LatestTxDetails.sig1,
        // sig2:state.InteractDatabase.LatestTxDetails.sig2,
        userOneIsMe:state.InteractDatabase.ActiveChannelDetails.userOneIsMe,
        privateKey:state.InteractReduxState.privKey
    }
}

export default connect( mapStateToProps)(CountersignTx);

//export default CountersignTx;