import React, { Component } from "react";
import { connect } from "react-redux";

import TxTokenRow from "./TxTokenRow";


class ProposeNewTx extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ToggleDispNewCh: false
        }
    }


    render() {
        return (
            <div>
                Next Nonce: -13- <br/>

                <div className="container-full">
                    <div className="row">
                        <div className="col-3 col-solid"></div>
                        <div className="col-2 col-solid">
                            You
                        </div>
                        <div className="col-2 col-solid">
                            CounterParty
                        </div>
                    </div>

                   
                    <TxTokenRow 
                        tokenName={"Marks"}
                        total={50}
                        bal={37}
                    />

                    <TxTokenRow 
                        tokenName={"Matts"}
                        total={30}
                        bal={6}
                    />
                    
                    You are trading xxx Mark for xxx Matt
                </div>


                {/* Your balance is:-37- -Marks- tokens ... Proposed new Balance <input type="text" /><br/><br/>
                Counterparty balance is:-13- -Matt- tokens ... Proposed new Balance <input type="text" /><br/><br/> */}
                <button className="btn btn-success">Submit and sign Transation</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeChannel: state.InteractReduxState.activeChannel
    }
}
export default connect(mapStateToProps)(ProposeNewTx);

//export default ProposeNewCh;

