import React, { Component } from "react";
import { connect } from "react-redux";

import ChRequested from "./ChDisplays/ChRequested";
import ChProposed from "./ChDisplays/ChProposed";
import ChOngoing from "./ChDisplays/ChOngoing";
//import ChTimingOut from "./ChDisplays/ChTimingOut";



class SelectChDisplay extends Component {



    render() {
        return (
            <div>
                <hr/>
                {(!this.props.ChDetails.userOneIsMe) && 
                (!this.props.isOngoing) && 
                (('u2Address'  in this.props.ChDetails)) &&
                    <ChRequested/>
                }
                {(this.props.ChDetails.userOneIsMe) && (!this.props.isOngoing) &&
                    <ChProposed/>
                }
                {(this.props.isOngoing) &&
                    <ChOngoing/>
                }
                

               
  
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isOngoing: state.InteractReduxState.activeChannel.isOngoing,
        ChDetails: state.InteractDatabase.ActiveChannelDetails
    }
}
export default connect(mapStateToProps)(SelectChDisplay);

//export default ProposeNewCh;



