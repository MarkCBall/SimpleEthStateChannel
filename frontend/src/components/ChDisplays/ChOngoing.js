import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";

import CurrentBalances from "../ContractInfo/CurrentBalances";
import InitialBalances from "../ContractInfo/InitialBalances";
import CountersignTx from "../CountersignTx";
import ProposeNewTx from "../ProposeNewTx";

//relative imports
import "./ChOngoing.css";

class ChOngoing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ToggleDispNewTx: false
        }
    }

    toggleDispNewTx = () => {
        this.setState({ToggleDispNewTx:!this.state.ToggleDispNewTx})
    }

    windowAlertBtn = (obj) => {
        if (obj !== undefined){
            return <button onClick={
                    () => window.alert(
                        JSON.stringify(
                            obj
                        )
                    )
                }>
            Raw Signature
            </button>
        }
        
    }
    

    render() {
        return (
            <div>

                <button onClick={()=>console.log(this.props.state)}>clikcme</button>

                <button 
                    className="btn btn-danger"
                    onClick={this.props.initChannelTermination}
                > Initialize channel termination
                </button>
                <br/>Terminating block#: Countdown___ submitted on nonce#:<br/><br/><br/>

                

                <div className="row">
                    <div className="col-4 col-solid"></div>
                    <div className="col-4 col-solid">
                        u1Address<br/>{this.props.u1Address}
                    </div>
                    <div className="col-4 col-solid">
                        u2Address<br/>{this.props.u2Address}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 col-solid">
                    Initial Balances
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1InitialTokenBal+" "+this.props.u1TokenName} tokens
                        <br/>
                        {"0 "+this.props.u2TokenName} tokens
                    </div>
                    <div className="col-4 col-solid">
                        {"0 "+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2InitialTokenBal+" "+this.props.u2TokenName} tokens
                        
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 col-solid">
                        Countersigned Balances
                        <br/>
                        HighestSignedNonce:{this.props.HighestSignedNonce}

                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1BalSigned+" "+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2InitialTokenBal-this.props.u2BalSigned+""+this.props.u2TokenName} tokens
                        <br/>
                        {this.windowAlertBtn(this.props.sig1Signed)}
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1InitialTokenBal-this.props.u1BalSigned+""+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2BalSigned+" "+this.props.u2TokenName} tokens
                        <br/>
                        {this.windowAlertBtn(this.props.sig2Signed)}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 col-solid">
                        if stuff here<br/>Agree and Sign Btn // Awaiting counterignature txt
                        <br/>
                        HighestNonce:{this.props.HighestNonce}
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1BalUnconfirmed+" "+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2InitialTokenBal-this.props.u2BalUnconfirmed+""+this.props.u2TokenName} tokens
                        <br/>
                        {this.windowAlertBtn(this.props.sig1Unconfirmed)}
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1InitialTokenBal-this.props.u1BalUnconfirmed+""+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2BalUnconfirmed+" "+this.props.u2TokenName} tokens
                        <br/>
                        {this.windowAlertBtn(this.props.sig2Unconfirmed)}
                        
                    </div>
                </div>

                <ProposeNewTx/>
                <br/>
                Make the stuff below cover this functionality nicely<br/>

                <div className="row">
                    <div className="col-4 col-solid">
                        Make new Tx Offer (Button)
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1BalUnconfirmed+" "+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2InitialTokenBal-this.props.u2BalUnconfirmed+""+this.props.u2TokenName} tokens
                    </div>
                    <div className="col-4 col-solid">
                        {this.props.u1InitialTokenBal-this.props.u1BalUnconfirmed+""+this.props.u1TokenName} tokens
                        <br/>
                        {this.props.u2BalUnconfirmed+" "+this.props.u2TokenName} tokens
                    </div>
                </div>


                {/* <div className="row line-above">
                    <div className="col-6 col-solid">
                    <CurrentBalances/>
                    </div>
                    <div className="col-6 col-solid">
                    <InitialBalances/>
                    </div>
                </div>

                <br/><br/>

                <CountersignTx/>
                
                
                
                
                <br/><br/>



                <button className="btn btn-info" onClick={this.toggleDispNewTx}>Toggle Propose New Transaction</button>
                <br/>
                {this.state.ToggleDispNewTx && 
                    <ProposeNewTx/>
                } */}


            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        state:state,

        //userOneIsMe,u1Address, u1InitialTokenBal,u1Sig OR u2Sig, u1TokenName.. same for u2
        ...state.InteractDatabase.ActiveChannelDetails,
        
        HighestNonce:state.InteractDatabase.HighestNonce,
        HighestSignedNonce:state.InteractDatabase.HighestSignedNonce,

        u1BalSigned:state.InteractDatabase.LatestSignedTxDetails.u1Bal,
        u2BalSigned:state.InteractDatabase.LatestSignedTxDetails.u2Bal,
        sig1Signed:state.InteractDatabase.LatestSignedTxDetails.sig1,
        sig2Signed:state.InteractDatabase.LatestSignedTxDetails.sig2,

        u1BalUnconfirmed:state.InteractDatabase.LatestTxDetails.u1Bal,
        u2BalUnconfirmed:state.InteractDatabase.LatestTxDetails.u2Bal,
        sig1Unconfirmed:state.InteractDatabase.LatestTxDetails.sig1,
        sig2Unconfirmed:state.InteractDatabase.LatestTxDetails.sig2,

        //u2Address:
        // address: state.InteractReduxState.addressSignedIn,
        // addressIsValid: state.InteractReduxState.addressIsValid,
        // pendingChannels: state.InteractDatabase.PendingChannels
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
