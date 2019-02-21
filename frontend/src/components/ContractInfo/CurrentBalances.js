import React, { Component } from "react";
import { connect } from "react-redux";


class CurrentBalances extends Component {


    render() {
        return (
            <div>

                Latest countersigned Nonce: {this.props.HighestSignedNonce}<br/>
                address1 has {this.props.u1Bal} xx Tokens and origBal- yy Tokens<br/>
                address2 has {this.props.u2Bal} yy Tokens and origBal- xx tokens<br/>
            
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        HighestSignedNonce: state.InteractDatabase.HighestSignedNonce,
        //LatestSignedTxDetails: state.InteractDatabase.LatestSignedTxDetails.u1Bal
        u1Bal: state.InteractDatabase.LatestSignedTxDetails.u1Bal,
        u2Bal: state.InteractDatabase.LatestSignedTxDetails.u2Bal
    }
}

export default connect( mapStateToProps)(CurrentBalances);



