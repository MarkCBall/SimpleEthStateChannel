import React, { Component } from "react";
import { connect } from "react-redux";

import ProposeNewCh from "./ProposeNewCh";
import ChButton from "./ChButton";


class SelectCh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ToggleDispNewCh: true
          //SET DEFAULT TO FALSE AFTER DEBUGGING
        }
    }

    toggleDispNewCh(){
        this.setState({ToggleDispNewCh:!this.state.ToggleDispNewCh})
    }

    render() {
        return (
            <div>
                {/* <button onClick={() => console.log(this.props.PendingChannels)}>ConsolelogState</button><br/> */}


                Pending your acceptance:
                {Object.keys(this.props.RequestedChannels).map(obj => {
                        return <ChButton key={obj} CID={obj}/>
                        })
                    }
                <br/>

                Pending other acceptance:
                {Object.keys(this.props.PendingChannels).map(obj => {
                    return <ChButton key={obj} CID={obj}/>
                    })
                }
                <br/>


                
                Ongoing/Closing:<button >CHx</button>
                <button>CHx</button>

                
                <br/>
                <button className="btn btn-info" onClick={this.toggleDispNewCh.bind(this)}>Toggle Propose New Channel</button>
                {this.state.ToggleDispNewCh &&
                <ProposeNewCh/>
                }

                
                <hr/>
                <h1>Selected Channel: {this.props.activeChannel}</h1>

                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        PendingChannels: state.InteractDatabase.PendingChannels,
        RequestedChannels: state.InteractDatabase.RequestedChannels,
        activeChannel: state.InteractReduxState.activeChannel
    }
}
export default connect(mapStateToProps)(SelectCh);




//export default SelectCh;

