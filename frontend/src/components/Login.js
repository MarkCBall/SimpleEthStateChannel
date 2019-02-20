import React, { Component } from "react";
import { connect } from "react-redux";
import InteractReduxState from "../redux/actions/InteractReduxState";
import InteractDatabase from "../redux/actions/InteractDatabase";


//mport { Button } from 'react-bootstrap';

class Login extends Component {
  

    render() {
        return (
            <div>
                {this.props.addressIsValid ? <>Logged in with </> : <>Enter valid address</> } &nbsp;
                <input 
                    type="text" 
                    size="33"
                    onChange={this.props.handleAddressChange}
                    value={this.props.address}
                />

                

                <button
                    type="button"
                    className="btn btn-link" >
                    Get login address from MetaMask
                </button>
                <br/>
                <button className="btn btn-info btn-sm">Toggle Display</button>
                <button className="btn btn-danger btn-sm">Interact with blockchain</button>
                <button className="btn btn-success btn-sm">Interact with statechannel</button>
                <hr/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        address: state.InteractReduxState.addressSignedIn,
        addressIsValid: state.InteractReduxState.addressIsValid,
        pendingChannels: state.InteractDatabase.PendingChannels
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAddressChange: (textString) => {
            dispatch(InteractReduxState.handleAddressChange(dispatch, textString.target.value))
            dispatch(InteractDatabase.getPendingChannels(dispatch, textString.target.value))
            dispatch(InteractDatabase.getRequestedChannels(dispatch, textString.target.value))
            //call the interact database from interact reduxstate?
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




//export default Login;
