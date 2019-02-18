import React, { Component } from "react";
//import { connect } from "react-redux";

import CurrentBalances from "./ContractInfo/CurrentBalances";
import InitialBalances from "./ContractInfo/InitialBalances";

class ChOngoing extends Component {


    render() {
        return (
            <div>

                <button> Initialize channel termination</button>
                <div className="row line-above">
                    <div className="col-6 col-solid">
                    <CurrentBalances/>
                    </div>
                    <div className="col-6 col-solid">
                    <InitialBalances/>
                    </div>
                </div>

                <br/><br/>
                You may sign the following transaction: xxxxxx <button>countersign</button>
                <br/><br/>
                <button>Toggle Propose New Transaction</button>
                <br/>
                Tx details:<input type="text" /><br/>More details<input type="text" />
                <button>Submit Transation</button>


            </div>
        );
    }
}

export default ChOngoing;

