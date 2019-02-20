import React, { Component } from "react";
import { connect } from "react-redux";


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
               
               Tx details:<input type="text" /><br/>
                    More details<input type="text" />
                    <button className="btn btn-success">Submit Transation</button>
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

