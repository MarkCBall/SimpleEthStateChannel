import React, { Component } from "react";
//import { connect } from "react-redux";
import InitialBalances from "../ContractInfo/InitialBalances";


class ChRequested extends Component {


    render() {
        return (
            <div>
               
               <InitialBalances/>
               <button className="btn btn-danger"> If these terms are acceptable, countersign it and put on blockchain</button>
            </div>
        );
    }
}

export default ChRequested;

