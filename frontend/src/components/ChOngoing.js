import React, { Component } from "react";
//import { connect } from "react-redux";

import CurrentBalances from "./ContractInfo/CurrentBalances";
import InitialBalances from "./ContractInfo/InitialBalances";

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
                You may sign the following transaction: xxxxxx <button className="btn btn-success">countersign</button>
                <br/><br/>

                <button className="btn btn-info" onClick={this.toggleDispNewTx.bind(this)}>Toggle Propose New Transaction</button>
                <br/>
                {this.state.ToggleDispNewTx && <> 
                    Tx details:<input type="text" /><br/>
                    More details<input type="text" />
                    <button className="btn btn-success">Submit Transation</button>
                </>}


            </div>
        );
    }
}

export default ChOngoing;
