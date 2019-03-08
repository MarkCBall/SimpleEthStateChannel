import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";
import Initial from "./SubChDisplays/Initial";
import Countersigned from "./SubChDisplays/Countersigned";
import HalfSigned from "./SubChDisplays/HalfSigned";
import NewTx from "./SubChDisplays/NewTx";

//relative imports
import "./ChOngoing.css";

// import {ethers} from "ethers";



class ChOngoing extends Component {

    render() {
        return (
            <div>
                <Initial/>
                
                {(Number(this.props.HighestSignedNonce) > 0) &&
                    <Countersigned/>
                }

                {(Number(this.props.HighestNonce) > Number(this.props.HighestSignedNonce)) &&
                    <HalfSigned/>
                }
                
                <NewTx/>

                <br/><br/>
                <button 
                    className="btn btn-danger"
                    onClick={this.props.initChannelTermination}
                > Initialize channel termination
                </button>
                <br/>Terminating block#: Countdown___ submitted on nonce#:




            </div>
        );
    }
}



function mapStateToProps(state) {
    return {     
        HighestNonce:state.InteractDatabase.HighestNonce,
        HighestSignedNonce:state.InteractDatabase.HighestSignedNonce,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initChannelTermination: () => {
            dispatch(InteractBlockchain.initChannelTermination(dispatch))     
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChOngoing);
