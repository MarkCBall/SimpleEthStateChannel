import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";

import CurrentBalances from "../ContractInfo/CurrentBalances";
import InitialBalances from "../ContractInfo/InitialBalances";
import CountersignTx from "../CountersignTx";
import ProposeNewTx from "../ProposeNewTx";

class ChOngoing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ToggleDispNewTx: false
        }
    }

    toggleDispNewTx = () => {
        this.setState({ToggleDispNewTx:!this.state.ToggleDispNewTx})
    }



    render() {
        return (
            <div>
                <button 
                    className="btn btn-danger"
                    onClick={this.props.initChannelTermination}
                > Initialize channel termination</button>
                <br/>Terminating block#: Countdown___ submitted on nonce#:<br/>

                <div className="row line-above">
                    <div className="col-6 col-solid">
                    <CurrentBalances/>
                    </div>
                    <div className="col-6 col-solid">
                    <InitialBalances/>
                    </div>
                </div>

                <br/><br/>

                <CountersignTx/>
                
                
                
                
                <br/><br/>



                <button className="btn btn-info" onClick={this.toggleDispNewTx}>Toggle Propose New Transaction</button>
                <br/>
                {this.state.ToggleDispNewTx && 
                    <ProposeNewTx/>
                }


            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        // address: state.InteractReduxState.addressSignedIn,
        // addressIsValid: state.InteractReduxState.addressIsValid,
        // pendingChannels: state.InteractDatabase.PendingChannels
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
