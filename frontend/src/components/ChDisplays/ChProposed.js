import React, { Component } from "react";
//import { connect } from "react-redux";
import Initial from "./SubChDisplays/Initial";


class ChProposed extends Component {


    render() {
        return (
            <div>
               
               <Initial/>
               <br/>
               <strong>Waiting for countersignature</strong>
            </div>
        );
    }
}

export default ChProposed;
