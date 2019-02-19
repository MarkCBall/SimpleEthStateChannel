import React, { Component } from "react";
//import { connect } from "react-redux";


import CurrentBalances from "./ContractInfo/CurrentBalances";


class ChTimingOut extends Component {


    render() {
        return (
            <div>


               
               Funds may be withdrawn in XXX time XXX blocks (implement blockchain function to get this)<br/>
               <button className="btn btn-danger">Withdraw funds if timed out</button>
               <CurrentBalances/>
               <br/><br/><br/>
               <button className="btn btn-danger">Submit Higher Nonce with data</button>
               <br/>
               Higher Nonce#<input type="text"></input><br/>
               Sig1<input type="text"></input><br/>
               Sig2<input type="text"></input><br/>
               u1Balance<input type="text"></input><br/>
               u2Balance<input type="text"></input><br/>

            </div>
        );
    }
}

export default ChTimingOut;

