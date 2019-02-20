import React, { Component } from "react";
import { connect } from "react-redux";

import ChRequested from "./ChRequested";
import ChOngoing from "./ChOngoing";
import ChTimingOut from "./ChTimingOut";
import ChProposed from "./ChProposed";


class SelectChDisplay extends Component {



    render() {
        return (
            <div>

                {//alternaterender selector selectedChannel.type ==  Requested && <ChRequested/>
                    //put all these into component called SelectDisplay
                }
                {/* if sig 1 is blank */}
                <ChRequested/><hr/>
                {/* if sig2 is blank */}
                <ChProposed/><hr/>
                {/* if on blockchain and latestnonce =0 */}
                <ChOngoing/><hr/>
                {/* if on blockchain and latestnonce >0 */}
                <ChTimingOut/><hr/>
                <hr/>
  
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeChannel: state.InteractReduxState.activeChannel
    }
}
export default connect(mapStateToProps)(SelectChDisplay);

//export default ProposeNewCh;

