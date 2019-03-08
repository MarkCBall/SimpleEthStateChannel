import React, { Component } from "react";
import { connect } from "react-redux";
import WindowAlertBtn from "./WindowAlertBtn"


//relative imports
import "../ChOngoing.css";



class Countersigned extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-4 col-solid">
                    HighestSignedNonce:{this.props.HighestSignedNonce}
                    <br/>
                    Countersigned Balances
                                        </div>
                <div className="col-4 col-solid">
                    {this.props.u1BalSigned+" "+this.props.u1TokenName} tokens
                    <br/>
                    {this.props.u2InitialTokenBal-this.props.u2BalSigned+""+this.props.u2TokenName} tokens
                    <br/>
                    <WindowAlertBtn obj={this.props.sig1Signed}/>
                </div>
                <div className="col-4 col-solid">
                    {this.props.u1InitialTokenBal-this.props.u1BalSigned+""+this.props.u1TokenName} tokens
                    <br/>
                    {this.props.u2BalSigned+" "+this.props.u2TokenName} tokens
                    <br/>
                    <WindowAlertBtn obj={this.props.sig2Signed}/>
                </div>
            </div>    
        );
    }
}




function mapStateToProps(state) {
    return {
        u1TokenName:state.InteractDatabase.ActiveChannelDetails.u1TokenName,
        u2TokenName:state.InteractDatabase.ActiveChannelDetails.u2TokenName,
        u1InitialTokenBal:state.InteractDatabase.ActiveChannelDetails.u1InitialTokenBal,
        u2InitialTokenBal:state.InteractDatabase.ActiveChannelDetails.u2InitialTokenBal,

        HighestSignedNonce:state.InteractDatabase.HighestSignedNonce,

        u1BalSigned:state.InteractDatabase.LatestSignedTxDetails.u1Bal,
        u2BalSigned:state.InteractDatabase.LatestSignedTxDetails.u2Bal,
        sig1Signed:state.InteractDatabase.LatestSignedTxDetails.sig1,
        sig2Signed:state.InteractDatabase.LatestSignedTxDetails.sig2,
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         initChannelTermination: () => {
//             dispatch(InteractBlockchain.initChannelTermination(dispatch))     
//         }
//     }
// }

export default connect(mapStateToProps)(Countersigned);

