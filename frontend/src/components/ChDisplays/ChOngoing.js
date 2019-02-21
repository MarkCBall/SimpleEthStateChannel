import React, { Component } from "react";
//import { connect } from "react-redux";

import CurrentBalances from "../ContractInfo/CurrentBalances";
import InitialBalances from "../ContractInfo/InitialBalances";
import CountersignTx from "../CountersignTx";
import ProposeNewTx from "../ProposeNewTx";

class ChOngoing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ToggleDispNewTx: false
        }
    }

    toggleDispNewTx(){
        this.setState({ToggleDispNewTx:!this.state.ToggleDispNewTx})
    }



    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <button className="btn btn-danger"> Initialize channel termination</button>
                <div className="row line-above">
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



                <button className="btn btn-info" onClick={this.toggleDispNewTx.bind(this)}>Toggle Propose New Transaction</button>
                <br/>
                {this.state.ToggleDispNewTx && 
                    <ProposeNewTx/>
                }


            </div>
        );
    }
}

export default ChOngoing;

