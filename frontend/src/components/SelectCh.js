import React, { Component } from "react";
//import { connect } from "react-redux";

import ProposeNewCh from "./ProposeNewCh";


class SelectCh extends Component {


    render() {
        return (
            <div>
                <button>CH1</button>
                <button>CH5</button>
                <button>CH36</button>

                
                {//forEach call to blockchain, show channels
                //forEach call to requested/proposed in database, show channels
                }

                <ProposeNewCh/>
                
            </div>
        );
    }
}

export default SelectCh;

