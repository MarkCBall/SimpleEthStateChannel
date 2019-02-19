import React, { Component } from "react";
//import { connect } from "react-redux";

import ProposeNewCh from "./ProposeNewCh";


class SelectCh extends Component {


    render() {
        return (
            <div>
                Pending your acceptance:<button className="btn btn-info btn-sm disabled">CH1</button>
                <br/>
                Pending other acceptance:<button className="btn btn-info btn-sm disabled">CH14</button>
                <br/>
                Ongoing:<button className="btn btn-info btn-sm active">CH5</button>
                <br/>
                Closing:<button className="btn btn-info btn-sm disabled">CH36</button>

                
                {//forEach call to blockchain, show channels
                //forEach call to requested/proposed in database, show channels
                }

                <ProposeNewCh/>
                
            </div>
        );
    }
}

export default SelectCh;

