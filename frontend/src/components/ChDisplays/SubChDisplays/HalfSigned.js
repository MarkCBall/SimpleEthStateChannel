import React, { Component } from "react";
import { connect } from "react-redux";
import WindowAlertBtn from "./WindowAlertBtn"

import FuncLib from "./FuncLib";
// import {ethers} from "ethers";

//relative imports
import "../ChOngoing.css";



class HalfSigned extends Component {

    signOrCounterSign = () => {
        if (
            (this.props.userOneIsMe && this.props.sig1Unconfirmed !== undefined)
            ||
            (!this.props.userOneIsMe && this.props.sig2Unconfirmed !== undefined)
        )
            return <div>Awaiting Countersignature</div>
        return <button
            onClick={this.countersignAndPostToDatabase}
            className="btn btn-success"
        >Countersign
                </button>
    }
    countersignAndPostToDatabase = async () => {

        let body;
        let sig = await FuncLib.signTxData(
            this.props.activeChannelNum,
            this.props.HighestNonce,
            this.props.u1BalUnconfirmed,
            this.props.u2BalUnconfirmed,
            this.props.privateKey
        )

        if (this.props.userOneIsMe) {
            body = { sig1: sig }
        }
        else {
            body = { sig2: sig }
        }
        console.log(body)

        fetch("http://52.60.66.253:3000/Transaction/confirm", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "cid": this.props.activeChannelNum,
                "nonce": this.props.HighestNonce
            },
            body: JSON.stringify(body)
        })
            .then("success", console.log)
            .catch("failure", console.log)
    }


    // //MOVE TO A LIBRARY???????????
    // //bytes32 TxHash = keccak256(abi.encodePacked(CID,nonce,u1BalRetained,u2BalRetained));
    // signNewTxData = async (u1BalRetained, u2BalRetained) => {
    //     //console.log(this.props.activeChannelNum,this.props.HighestNonce,u1BalRetained,u2BalRetained)

    //     //generate the hash to sign based on channel details
    //     let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
    //         ['uint', 'uint', 'uint', 'uint'],
    //         [
    //             this.props.activeChannelNum,
    //             this.props.HighestNonce,
    //             u1BalRetained,
    //             u2BalRetained
    //         ]
    //     );
    //     let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

    //     let firstwallet = new ethers.Wallet(this.props.privateKey)
    //     let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)//.then(console.log)
    //     let sig = ethers.utils.splitSignature(flatSig);
    //     //console.log(sig)
    //     return sig
    // }





    render() {
        return (
            <div className="row">
                <div className="col-4 col-solid">
                    {this.signOrCounterSign()}
                    <br />
                    HighestNonce:{this.props.HighestNonce}
                </div>
                <div className="col-4 col-solid">
                    {this.props.u1BalUnconfirmed + " " + this.props.u1TokenName} tokens
                                <br />
                    {this.props.u2InitialTokenBal - this.props.u2BalUnconfirmed + "" + this.props.u2TokenName} tokens
                                <br />
                    <WindowAlertBtn obj={this.props.sig1Unconfirmed} />
                </div>
                <div className="col-4 col-solid">
                    {this.props.u1InitialTokenBal - this.props.u1BalUnconfirmed + "" + this.props.u1TokenName} tokens
                                <br />
                    {this.props.u2BalUnconfirmed + " " + this.props.u2TokenName} tokens
                                <br />
                    <WindowAlertBtn obj={this.props.sig2Unconfirmed} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

        activeChannelNum: state.InteractReduxState.activeChannel.channel,
        privateKey: state.InteractReduxState.privKey,

        //userOneIsMe,u1Address, u1InitialTokenBal,u1Sig OR u2Sig, u1TokenName.. same for u2
        ...state.InteractDatabase.ActiveChannelDetails,

        HighestNonce: state.InteractDatabase.HighestNonce,

        u1BalUnconfirmed: state.InteractDatabase.LatestTxDetails.u1Bal,
        u2BalUnconfirmed: state.InteractDatabase.LatestTxDetails.u2Bal,
        sig1Unconfirmed: state.InteractDatabase.LatestTxDetails.sig1,
        sig2Unconfirmed: state.InteractDatabase.LatestTxDetails.sig2,
    }
}
export default connect(mapStateToProps)(HalfSigned);

