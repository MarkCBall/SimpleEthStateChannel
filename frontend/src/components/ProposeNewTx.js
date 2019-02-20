import React, { Component } from "react";
import { connect } from "react-redux";

//import TxTokenRow from "./TxTokenRow";


class ProposeNewTx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyTokenTx: 0,
            YourTokenTx:0
        }
    }
    handleMyTokenChange = (event) => {
        this.setState({MyTokenTx:event.target.value})
    }

    MySubmitAndSign = () => {
        //call to the database
    }

    render() {
        return (
            <div>
                {/* Next Nonce: -13- <br/>

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
                        yourBal={37}
                    />

                    <TxTokenRow 
                        tokenName={"Matts"}
                        total={30}
                        yourBal={6}
                    /> */}
                    
                    You are trading 
                    <input 
                        type="text" 
                        size="3"
                        onChange={ this.handleMyTokenChange   }
                        value={this.state.MyTokenTx}
                    />
                    {"Mark"}
                    tokens for
                    {"xxx"}
                    {"Matt"}
                    tokens 
                    <button> submit and sign</button>
                    <br/>



                {/* </div> */}


                {/* Your balance is:-37- -Marks- tokens ... Proposed new Balance <input type="text" /><br/><br/>
                Counterparty balance is:-13- -Matt- tokens ... Proposed new Balance <input type="text" /><br/><br/> 
                <button className="btn btn-success">Submit and sign Transation</button>*/}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeChannel: state.InteractReduxState.activeChannel
        //do stuff here to pull in token names for the channel specified
    }
}
export default connect(mapStateToProps)(ProposeNewTx);

//export default ProposeNewCh;

