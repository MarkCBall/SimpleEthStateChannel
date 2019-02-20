import React, { Component } from "react";



class TxTokenRow extends Component {

    counterpartyBal = () => {
        return this.props.total - this.props.bal;
    }

    render() {
        return (
            <div className="row">
                <div className="col-3 col-solid">
                    {this.props.tokenName}
                </div>
                <div className="col-2 col-solid">
                    {this.props.bal}
                </div>
                <div className="col-2 col-solid">
                    {this.counterpartyBal()}
                </div>
            </div>


        );
    }
}

export default TxTokenRow;

