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
               
                <button onClick={this.toggleDispNewCh.bind(this)}>Toggle Propose New Channel</button>

                <br/>
                {this.state.ToggleDispNewCh && <> 
                    Enter counterparty address <input type="text"/><br/>

                    Enter your token name <input type="text"/><br/>
                    Enter counterparty token name <input type="text"/><br/>
                    
                    Enter your token balance <input type="text"/><br/>
                    Enter counterparty token balance <input type="text"/><br/>
                    Fill out Capcha to <button>Submit New Channel</button>
                </>}


                <hr/>
            </div>
        );
    }
}

export default ProposeNewCh;

