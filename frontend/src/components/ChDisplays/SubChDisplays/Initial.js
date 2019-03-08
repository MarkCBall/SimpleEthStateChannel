import React, { Component } from "react";
import { connect } from "react-redux";


//relative imports
import "../ChOngoing.css";



class Initial extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-4 col-solid"></div>
                    <div className="col-4 col-solid">
                        u1Address<br />{this.props.u1Address}
                    </div>
                    <div className="col-4 col-solid">
                        u2Address<br />{this.props.u2Address}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 col-solid">
                        Initial Balances
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1InitialTokenBal + " " + this.props.u1TokenName} tokens
                    <br />
                        {"0 " + this.props.u2TokenName} tokens
                    </div>
                    <div className="col-4 col-solid">
                        {"0 " + this.props.u1TokenName} tokens
                    <br />
                        {this.props.u2InitialTokenBal + " " + this.props.u2TokenName} tokens
                    </div>
                </div>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        //userOneIsMe,u1Address, u1InitialTokenBal,u1Sig OR u2Sig, u1TokenName.. same for u2
        ...state.InteractDatabase.ActiveChannelDetails,
    }
}
export default connect(mapStateToProps)(Initial);

