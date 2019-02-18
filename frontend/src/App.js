

import { Provider } from "react-redux";
import store from "./redux/index";
import React, { Component } from "react";


import Login from "./components/Login";
import SelectCh from "./components/SelectCh";
import ChRequested from "./components/ChRequested";
import ChOngoing from "./components/ChOngoing";
import ChTimingOut from "./components/ChTimingOut";
import ChProposed from "./components/ChProposed";

import './App.css';


class App extends Component {

    renderChannel(){
        var x = Math.random()*4
        if(x<1)//state == blah blah
            return <ChRequested/>
        if(x<2)
            return <ChOngoing/>
        if(x<3)
            return <ChProposed/>
        return <ChTimingOut/>

    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Login />
                    <SelectCh/>
                    {this.renderChannel()}
                    {//alternaterender selector selectedChannel.type ==  Requested && <ChRequested/>
                    }
                    <hr/>

                

                </div>
            </Provider>
        );
    }
}

export default App;
