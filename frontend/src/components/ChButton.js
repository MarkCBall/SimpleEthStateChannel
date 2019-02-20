import React, { Component } from "react";
import { connect } from "react-redux";
import InteractReduxState from "../redux/actions/InteractReduxState";


class ChButton extends Component {


    render() {
        return (
                <button 
                    className="btn btn-info btn-sm disabled"
                    onClick={() => this.props.setActiveChannel(this.props.channel)}
                >
                    CH{this.props.channel}
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
        setActiveChannel: (channel) => {
            dispatch(InteractReduxState.setActiveChannel(dispatch, channel))
        }
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(ChButton);

