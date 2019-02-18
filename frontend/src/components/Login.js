import React, { Component } from "react";
import { connect } from "react-redux";
import InteractReduxState from "../redux/actions/InteractReduxState";

//mport { Button } from 'react-bootstrap';

class Login extends Component {

    //isValidAddress(){
        // return etherJS call to check if this.props.address is a real eth address
    //}
    
   

    render() {
        return (
            <div>
                Logged in with &nbsp;
                <input 
                    type="text" 
                    size="33"
                    onChange={this.props.handleAddressChange}
                    value={this.props.address}
                />

                {//isValidAddress().bind(this) ? Address is valid image : Address is invalid image    -- another tag for demo address
                }

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
