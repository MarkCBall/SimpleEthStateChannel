import React, { Component } from "react";
import { connect } from "react-redux";


import {ethers} from "ethers";


//import TxTokenRow from "./TxTokenRow";


class ProposeNewTx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyTokenTx: 0,
            CounterpartyTokenTx:0
        }
    }
    handleMyTokenChange = (event) => {
        this.setState({MyTokenTx:event.target.value})
    }
    handleCounterpartyTokenChange = (event) => {
        this.setState({CounterpartyTokenTx:event.target.value})
    }

    //bytes32 TxHash = keccak256(abi.encodePacked(CID,nonce,u1BalRetained,u2BalRetained));
    signNewTxData = async (u1BalRetained,u2BalRetained) => {
        console.log(this.props.activeChannelNum,this.props.HighestNonce,u1BalRetained,u2BalRetained)

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
        console.log(sig)
        return sig
    }

 

    SubmitAndSign = async () => {
        var body;
        if (this.props.userOneIsMe){
            body = {
                sig1: await this.signNewTxData(this.state.MyTokenTx,this.state.CounterpartyTokenTx),
                u1Bal:this.state.MyTokenTx,
                u2Bal:this.state.CounterpartyTokenTx
            }
        }
        else{
            body = {
                sig2: await this.signNewTxData(this.state.CounterpartyTokenTx,this.state.MyTokenTx),
                u1Bal:this.state.CounterpartyTokenTx,
                u2Bal:this.state.MyTokenTx
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
                    
                    You are trading 
                    <input 
                        type="text" 
                        size="2"
                        onChange={ this.handleMyTokenChange   }
                        value={this.state.MyTokenTx}
                    /> &nbsp;
                    {this.props.userOneIsMe ? this.props.u1TokenName : this.props.u2TokenName}
                    &nbsp; tokens for &nbsp;
                    <input 
                        type="text" 
                        size="2"
                        onChange={ this.handleCounterpartyTokenChange   }
                        value={this.state.CounterpartyTokenTx}
                    />&nbsp;
                    {this.props.userOneIsMe ? this.props.u2TokenName : this.props.u1TokenName}
                    &nbsp; tokens &nbsp;
                    <button className="btn btn-success" onClick={() => this.SubmitAndSign()}> submit and sign</button>
                    <br/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

        activeChannelNum: state.InteractReduxState.activeChannel.channel,
        privateKey : state.InteractReduxState.privKey,
        HighestNonce: state.InteractDatabase.HighestNonce,
        addressSignedIn: state.InteractReduxState.addressSignedIn,
        u1TokenName: state.InteractDatabase.ActiveChannelDetails.u1TokenName,
        u2TokenName: state.InteractDatabase.ActiveChannelDetails.u2TokenName,
        u1Address : state.InteractDatabase.ActiveChannelDetails.u1Address,
        userOneIsMe : state.InteractDatabase.ActiveChannelDetails.userOneIsMe
    }
}
export default connect(mapStateToProps)(ProposeNewTx);

//export default ProposeNewCh;



// {/* Next Nonce: -13- <br/>

//                  <div className="container-full">
//                     <div className="row">
//                         <div className="col-3 col-solid"></div>
//                         <div className="col-2 col-solid">
//                             You
//                         </div>
//                         <div className="col-2 col-solid">
//                             CounterParty
//                         </div>
//                     </div>

                   
//                     <TxTokenRow 
//                         tokenName={"Marks"}
//                         total={50}
//                         yourBal={37}
//                     />

//                     <TxTokenRow 
//                         tokenName={"Matts"}
//                         total={30}
//                         yourBal={6}
//                     /> */}

