import React, { Component } from "react";
import { connect } from "react-redux";

//import TxTokenRow from "./TxTokenRow";


class ProposeNewTx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyTokenTx: 0,
            CounterpartyTokenTx:0
        }
    }
    handleMyTokenChange = (event) => {
        this.setState({MyTokenTx:event.target.value})
    }
    handleCounterpartyTokenChange = (event) => {
        this.setState({CounterpartyTokenTx:event.target.value})
    }

    userOneIsMe = () => {
        return this.props.u1Address === this.props.addressSignedIn
    }

    // getMyTokenName = () => {
    //     return userOneIsMe() ? this.props.u1TokenName : this.props.u2TokenName

    // }
    // getCounterpartyTokenName = () => {
    //     if (this.props.u1Address === this.props.addressSignedIn)
    //         return this.props.u2TokenName
    //     return this.props.u1TokenName
    // }

    SubmitAndSign = () => {
        var body;
        if (this.userOneIsMe()){
            body = {
                sig1:"put functioncall here",
                u1Bal:this.state.MyTokenTx,
                u2Bal:this.state.CounterpartyTokenTx
            }
        }
        else{
            body = {
                sig2:"put functioncall here",
                u1Bal:this.state.CounterpartyTokenTx,
                u2Bal:this.state.MyTokenTx
            }
        }
        //console.log("body is",body)
        fetch("http://localhost:3001/Transaction/new", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "cid":this.props.activeChannel,
                },
                body: JSON.stringify(body)
            })
            .then("success",console.log)
            .catch("failure",console.log)

        //call to the database
    }

    render() {
        return (
            <div>

                {/* <button onClick={()=>console.log(this.props.u1TokenName)}>clickme</button> */}
                
                    
                    You are trading 
                    <input 
                        type="text" 
                        size="2"
                        onChange={ this.handleMyTokenChange   }
                        value={this.state.MyTokenTx}
                    /> &nbsp;
                    {this.userOneIsMe() ? this.props.u1TokenName : this.props.u2TokenName}
                    &nbsp; tokens for &nbsp;
                    <input 
                        type="text" 
                        size="2"
                        onChange={ this.handleCounterpartyTokenChange   }
                        value={this.state.CounterpartyTokenTx}
                    />&nbsp;
                    {this.userOneIsMe() ? this.props.u2TokenName : this.props.u1TokenName}
                    &nbsp; tokens &nbsp;
                    <button onClick={() => this.SubmitAndSign()}> submit and sign</button>
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
        activeChannel: state.InteractReduxState.activeChannel,
        addressSignedIn: state.InteractReduxState.addressSignedIn,
        u1TokenName: state.InteractDatabase.ActiveChannelDetails.u1TokenName,
        u2TokenName: state.InteractDatabase.ActiveChannelDetails.u2TokenName,
        u1Address : state.InteractDatabase.ActiveChannelDetails.u1Address
        //do stuff here to pull in token names for the channel specified
    }
}
export default connect(mapStateToProps)(ProposeNewTx);

//export default ProposeNewCh;



// {/* Next Nonce: -13- <br/>

//                  <div className="container-full">
//                     <div className="row">
//                         <div className="col-3 col-solid"></div>
//                         <div className="col-2 col-solid">
//                             You
//                         </div>
//                         <div className="col-2 col-solid">
//                             CounterParty
//                         </div>
//                     </div>

                   
//                     <TxTokenRow 
//                         tokenName={"Marks"}
//                         total={50}
//                         yourBal={37}
//                     />

//                     <TxTokenRow 
//                         tokenName={"Matts"}
//                         total={30}
//                         yourBal={6}
//                     /> */}

