import React, { Component } from "react";
import { connect } from "react-redux";
//import InteractReduxState from "../redux/actions/InteractReduxState";

class CountersignTx extends Component {

    countersignAndPostToDatabase = () =>{
        
        // var u1Bal=this.props.u1Bal;
        // var u2Bal=this.props.u2Bal;

        var body;
        if (this.props.userOneIsMe){
            body = {
                sig1:"put functioncall here - second signer"
            }
        }
        else{
            body = {
                sig2:"put functioncall here - second signer"
            }
        }

        fetch("http://35.183.188.67:3001/Transaction/confirm", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "cid":this.props.activeChannel,
                "nonce":this.props.HighestNonce
            },
            body: JSON.stringify(body)
        })
        .then("success",console.log)
        .catch("failure",console.log)
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

                {((this.props.sig1===undefined && this.props.userOneIsMe) ||
                 (this.props.sig2===undefined && !this.props.userOneIsMe))
                &&
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
        activeChannel: state.InteractReduxState.activeChannel,
        HighestNonce: state.InteractDatabase.HighestNonce,
        u1Bal:state.InteractDatabase.LatestTxDetails.u1Bal,
        u2Bal:state.InteractDatabase.LatestTxDetails.u2Bal,
        //txDetails:state.InteractDatabase.LatestTxDetails,
        sig1:state.InteractDatabase.LatestTxDetails.sig1,
        sig2:state.InteractDatabase.LatestTxDetails.sig2,
        userOneIsMe:state.InteractDatabase.ActiveChannelDetails.userOneIsMe
    }
}

export default connect( mapStateToProps)(CountersignTx);

//export default CountersignTx;