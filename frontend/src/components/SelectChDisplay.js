import React, { Component } from "react";
import { connect } from "react-redux";

import ChRequested from "./ChDisplays/ChRequested";
import ChProposed from "./ChDisplays/ChProposed";
import ChOngoing from "./ChDisplays/ChOngoing";
import ChTimingOut from "./ChDisplays/ChTimingOut";



class SelectChDisplay extends Component {



    render() {
        return (
            <div>

                {(this.props.ChDetails.ChType === "requested") &&
                    <ChRequested/>
                }
                {(this.props.ChDetails.ChType === "proposed") &&
                    <ChProposed/>
                }


                {/* if on blockchain and latestnonce =0 */}
                <ChOngoing/><hr/>
                 {/* if on blockchain and latestnonce >0  */}
                <ChTimingOut/><hr/>
               
  
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeChannel: state.InteractReduxState.activeChannel,
        ChDetails: state.InteractDatabase.ActiveChannelDetails
    }
}
export default connect(mapStateToProps)(SelectChDisplay);

//export default ProposeNewCh;



