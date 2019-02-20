import React, { Component } from "react";
import { connect } from "react-redux";


class InitialBalances extends Component {


    render() {
        return (
            <div>
                    The channel started with:
                <br/>
                    {this.props.ChDetails.u1InitialTokenBal}
                    {this.props.ChDetails.u1TokenName}
                    tokens at address
                    {this.props.ChDetails.u1Address}
                <br/>
                    {this.props.ChDetails.u2InitialTokenBal}
                    {this.props.ChDetails.u2TokenName}
                    tokens at address
                    {this.props.ChDetails.u2Address}
                <br/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ChDetails: state.InteractDatabase.ActiveChannelDetails
    }
}

// u1Address: "2"
// u1InitialTokenBal: "1"
// u1Sig: "1"
// u1TokenName: "1"
// u2Address: "1"
// u2InitialTokenBal: "1"
// u2TokenName: "1"

export default connect(mapStateToProps)(InitialBalances);




//export default InitialBalances;
