import React, { Component } from "react";
import { connect } from "react-redux";
import InteractReduxState from "../redux/actions/InteractReduxState";
import InteractDatabase from "../redux/actions/InteractDatabase";


class ChButton extends Component {


    render() {
        return (
                <>
                    {(this.props.CID === this.props.activeChannel) ?
                        <button 
                            className="btn btn-info btn-sm active"
                            onClick={() => this.props.setActiveChannel(this.props.CID)}
                        >
                            CH{this.props.CID}
                        </button>
                    :
                        <button 
                            className="btn btn-info btn-sm disabled"
                            onClick={() => this.props.setActiveChannel(this.props.CID)}
                        >
                            CH{this.props.CID}
                        </button>
                    }
                </>

        );
    }
}

function mapStateToProps(state) {
    return {
        activeChannel: state.InteractReduxState.activeChannel
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setActiveChannel: (CID) => {
            dispatch(InteractReduxState.setActiveChannel(dispatch, CID));
            dispatch(InteractDatabase.getChannelDetails(dispatch,CID));
            dispatch(InteractDatabase.getHighestNonce(dispatch,CID));
            dispatch(InteractDatabase.getHighestSignedNonce(dispatch,CID));
        }
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(ChButton);

