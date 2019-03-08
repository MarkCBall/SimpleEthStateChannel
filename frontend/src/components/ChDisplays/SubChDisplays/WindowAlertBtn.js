import React, { Component } from "react";

class WindowAlertBtn extends Component {

    windowAlertBtn = (obj) => {
        if (obj !== undefined){
            return <button onClick={
                    () => window.alert(
                        JSON.stringify(
                            obj
                        )
                    )
                }>
            Raw Signature
            </button>
        }
    }

    render() {
        return (
            <>
            {this.windowAlertBtn(this.props.obj)}
            </>
        );
    }
}
export default WindowAlertBtn;



