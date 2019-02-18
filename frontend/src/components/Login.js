import React, { Component } from "react";
import { connect } from "react-redux";
import InteractReduxState from "../redux/actions/InteractReduxState";


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
                    className="btn btn-primary" >
                    Get login address from MetaMask
                </button>
                <hr/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        address: state.InteractReduxState.addressSignedIn,
        addressIsValid: state.InteractReduxState.addressIsValid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAddressChange: (textString) => {
            dispatch(InteractReduxState.handleAddressChange(dispatch, textString.target.value))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




//export default Login;
