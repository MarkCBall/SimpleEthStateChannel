import React, { Component } from "react";
import { connect } from "react-redux";
import InitialBalances from "../ContractInfo/InitialBalances";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";


class ChRequested extends Component {


    render() {
        return (
            <div>
               
               <InitialBalances/>
               <button 
                    className="btn btn-danger"
                    onClick={this.props.countersignChannel}
                > If these terms are acceptable, countersign it and put on blockchain</button>
            
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
        countersignChannel: () => {
            dispatch(InteractBlockchain.countersignChannel(dispatch))
            
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChRequested);



