import React, { Component } from "react";
import { connect } from "react-redux";
import FuncLib from "./FuncLib";


//relative imports
import "../ChOngoing.css";



class NewTx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            u1Bal: 0,
            u2Bal: 0
        }
    }

    handleU1Change = (event) => {
        let u1Bal = Number(event.target.value)
        if ((u1Bal >= 0) && (u1Bal <= Number(this.props.u1InitialTokenBal))) {
            this.setState({
                ...this.state,
                u1Bal: u1Bal
            })
        }

    }
    handleU2Change = (event) => {
        let u2Bal = Number(event.target.value)
        if ((u2Bal >= 0) && (u2Bal <= Number(this.props.u2InitialTokenBal))) {
            this.setState({
                ...this.state,
                u2Bal: u2Bal
            })
        }
    }

    SubmitAndSign = async () => {
        let body;
        let sig = await FuncLib.signTxData(
            this.props.activeChannelNum,
            this.props.HighestNonce+1,
            this.state.u1Bal,
            this.state.u2Bal,
            this.props.privateKey
        )
        if (this.props.userOneIsMe) {
            body = {
                sig1: sig,//await this.signNewTxData(this.state.u1Bal, this.state.u2Bal),
                u1Bal: this.state.u1Bal,
                u2Bal: this.state.u2Bal
            }
        }
        else {
            body = {
                sig2: sig,//await this.signNewTxData(this.state.u1Bal, this.state.u2Bal),
                u1Bal: this.state.u1Bal,
                u2Bal: this.state.u2Bal
            }
        }
        fetch("http://52.60.66.253:3000/Transaction/new", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "cid": this.props.activeChannelNum,
            },
            body: JSON.stringify(body)
        })
            .then("success", console.log)
            .catch("failure", console.log)

    }





    render() {
        return (
            <div className="row">
                <div className="col-4 col-solid">
                    Make new Tx Offer (Button)
                        <br />
                    <button className="btn btn-success" onClick={() => this.SubmitAndSign()}> submit and sign</button>
                </div>
                <div className="col-4 col-solid">
                    <input
                        type="text"
                        size="2"
                        onChange={this.handleU1Change}
                        value={this.state.u1Bal}
                    />
                    {" " + this.props.u1TokenName} tokens
                        <br />
                    {this.props.u2InitialTokenBal - this.state.u2Bal + "" + this.props.u2TokenName} tokens
                    </div>
                <div className="col-4 col-solid">
                    {this.props.u1InitialTokenBal - this.state.u1Bal + "" + this.props.u1TokenName} tokens
                        <br />
                    <input
                        type="text"
                        size="2"
                        onChange={this.handleU2Change}
                        value={this.state.u2Bal}
                    />
                    {" " + this.props.u2TokenName} tokens
                    </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        activeChannelNum: state.InteractReduxState.activeChannel.channel,
        privateKey : state.InteractReduxState.privKey,

        //userOneIsMe,u1Address, u1InitialTokenBal,u1Sig OR u2Sig, u1TokenName.. same for u2
        ...state.InteractDatabase.ActiveChannelDetails,
        
        HighestNonce:state.InteractDatabase.HighestNonce,
    }
}
export default connect(mapStateToProps)(NewTx);

