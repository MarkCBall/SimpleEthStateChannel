import React, { Component } from "react";
import { connect } from "react-redux";
import InteractReduxState from "../redux/actions/InteractReduxState";
import InteractDatabase from "../redux/actions/InteractDatabase";
import InteractBlockchain from "../redux/actions/InteractBlockchain";
import {isValidAddress} from "ethereumjs-util";


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
                {isValidAddress(this.props.address) ?
                    <div>VALID - do this better</div>
                :
                    <div>INVALID - do this better</div>
                }

                {this.props.pubPrivKeypairValid ? <>private key good </> : <>unmatched keypair</> } &nbsp;
                <input 
                    type="text" 
                    size="33"
                    onChange={this.props.handlePrivKeyChange}
                    value={this.props.privKey}
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
        privKey : state.InteractReduxState.privKey,
        pubPrivKeypairValid : state.InteractReduxState.pubPrivKeypairValid,
        address: state.InteractReduxState.addressSignedIn,
        addressIsValid: state.InteractReduxState.addressIsValid,
        pendingChannels: state.InteractDatabase.PendingChannels
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAddressChange: (Event) => {
            dispatch(InteractReduxState.handleAddressChange(dispatch, Event.target.value))

            //can this be done better?
            if (isValidAddress(Event.target.value)){
                dispatch(InteractDatabase.getPendingChannels(dispatch, Event.target.value))
                dispatch(InteractDatabase.getRequestedChannels(dispatch, Event.target.value))
                dispatch(InteractBlockchain.getOngoingChannels(dispatch, Event.target.value))
                
            }
        },
        handlePrivKeyChange: (Event) => {
            dispatch(InteractReduxState.handlePrivKeyChange(dispatch, Event.target.value))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




//export default Login;
