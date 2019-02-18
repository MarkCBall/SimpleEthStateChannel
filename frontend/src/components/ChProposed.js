import React, { Component } from "react";
//import { connect } from "react-redux";
import InitialBalances from "./ContractInfo/InitialBalances";


class ChProposed extends Component {


    render() {
        return (
            <div>
               
               <InitialBalances/>
               <strong>Waiting for countersignature</strong>
            </div>
        );
    }
}

export default ChProposed;
