import React, { Component } from "react";
import { connect } from "react-redux";
import WindowAlertBtn from "./WindowAlertBtn"

import FuncLib from "./FuncLib";
// import {ethers} from "ethers";

//relative imports
import "../ChOngoing.css";



class NewTx extends Component {
    constructor(props) {
        super(props);
        this.state = {

          u1Bal:0,
          u2Bal:0
        }
    }
   






    render() {
        return (
            
        );
    }
}

function mapStateToProps(state) {
    return {

       
    }
}
export default connect(mapStateToProps)(NewTx);

