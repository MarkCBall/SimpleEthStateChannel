import React, { Component } from "react";
import { connect } from "react-redux";

import ProposeNewCh from "./ProposeNewCh";
import ChButton from "./ChButton";


class SelectCh extends Component {
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

                Ongoing/Closing:
                {Object.keys(this.props.OngoingChannels).map(obj => {
                    return <ChButton key={obj} CID={obj}/>
                    })
                }
                <br/>

                
                <br/>
                <button className="btn btn-info" onClick={this.toggleDispNewCh.bind(this)}>Toggle Propose New Channel</button>
                {this.state.ToggleDispNewCh &&
                <ProposeNewCh/>
                }
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        OngoingChannels: state.InteractBlockchain.OngoingChannels,
        PendingChannels: state.InteractDatabase.PendingChannels,
        RequestedChannels: state.InteractDatabase.RequestedChannels,
        activeChannel: state.InteractReduxState.activeChannel
    }
}
export default connect(mapStateToProps)(SelectCh);




//export default SelectCh;

