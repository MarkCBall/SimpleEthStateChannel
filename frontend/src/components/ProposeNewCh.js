import React, { Component } from "react";
//import { connect } from "react-redux";


class ProposeNewCh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ToggleDispNewCh: false
        }
    }

    toggleDispNewCh(){
        this.setState({ToggleDispNewCh:!this.state.ToggleDispNewCh})
    }

    render() {
        return (
            <div>
               
                <button className="btn btn-info" onClick={this.toggleDispNewCh.bind(this)}>Toggle Propose New Channel</button>

                <br/>
                {this.state.ToggleDispNewCh && <> 
                    <form action="http://localhost:3001/Channel" method="post">
                        Enter CID <input type="text" name="CID"/><br/>

                        Enter counterparty address <input type="text" name="u2Address"/><br/>

                        Enter your token name <input type="text" name="u1TokenName"/><br/>
                        Enter counterparty token name <input type="text" name="u2TokenName"/><br/>
                        
                        Enter your token balance <input type="text" name="u1InitialTokenBal"/><br/>
                        Enter counterparty token balance <input type="text" name="u2InitialTokenBal"/><br/>

                        Enter your signature <input type="text" name="u1Sig"/><br/>
                        Enter your address <input type="text" name="u1Address"/><br/>

                        Fill out Capcha to <input type="submit" value="Propose New Channel" className="btn btn-success"/>
                    </form>
                </>}


                <hr/>
            </div>
        );
    }
}

export default ProposeNewCh;

