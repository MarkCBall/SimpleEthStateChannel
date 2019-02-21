import React, { Component } from "react";
import { connect } from "react-redux";
//import InteractReduxState from "../redux/actions/InteractReduxState";

class CountersignTx extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ToggleDispNewTx: false
        }
    }

    toggleDispNewTx(){
        this.setState({ToggleDispNewTx:!this.state.ToggleDispNewTx})
    }




 


    render() {
        return (
            <div>
                Latest nonce for the channel is:
                {this.props.HighestNonce}
                <br/>
                You may sign the following transaction: <br/>
                u1Bal:{this.props.u1Bal}<br/>
                u2Bal:{this.props.u2Bal}
                <button className="btn btn-success">countersign</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeChannel: state.InteractReduxState.activeChannel,
        HighestNonce: state.InteractDatabase.HighestNonce,
        u1Bal:state.InteractDatabase.LatestTxDetails.u1Bal,
        u2Bal:state.InteractDatabase.LatestTxDetails.u2Bal
    }
}

export default connect( mapStateToProps)(CountersignTx);

//export default CountersignTx;