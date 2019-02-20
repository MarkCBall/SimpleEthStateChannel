import React, { Component } from "react";
import { connect } from "react-redux";
import InteractReduxState from "../redux/actions/InteractReduxState";
import InteractDatabase from "../redux/actions/InteractDatabase";


class ChButton extends Component {


    render() {
        return (
                <button 
                    className="btn btn-info btn-sm disabled"
                    onClick={() => this.props.setActiveChannel(this.props.CID)}
                >
                    CH{this.props.CID}
                </button>
        );
    }
}

function mapStateToProps(state) {
    return {
        // activeChannel: state.InteractReduxState.activeChannel
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setActiveChannel: (CID) => {
            dispatch(InteractReduxState.setActiveChannel(dispatch, CID));
            dispatch(InteractDatabase.getChannelDetails(dispatch,CID))
        }
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(ChButton);

