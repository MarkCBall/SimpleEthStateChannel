import React, { Component } from "react";
import { connect } from "react-redux";

import ProposeNewCh from "./ProposeNewCh";


class SelectCh extends Component {


    render() {
        return (
            <div>
                {/* <button onClick={() => console.log(this.props.PendingChannels)}>ConsolelogState</button><br/> */}


                Pending your acceptance:
                {Object.keys(this.props.RequestedChannels).map(obj => {
                        return <div key={obj}>
                            <button className="btn btn-info btn-sm disabled">CH{obj}</button>
                        </div>
                        })
                    }
                <br/>
                Pending other acceptance:
                {Object.keys(this.props.PendingChannels).map(obj => {
                    return <div key={obj}>
                        <button className="btn btn-info btn-sm disabled">CH{obj}</button>
                    </div>
                    })
                }
                <br/>


                
                Ongoing/Closing:<button className="btn btn-info btn-sm active">CH5</button>
                <button className="btn btn-info btn-sm disabled">CH36</button>

                
            

                <ProposeNewCh/>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        PendingChannels: state.InteractDatabase.PendingChannels,
        RequestedChannels: state.InteractDatabase.RequestedChannels
    }
}
export default connect(mapStateToProps)(SelectCh);




//export default SelectCh;

