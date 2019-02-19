

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


    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Login />
                    <SelectCh/>
                    {//alternaterender selector selectedChannel.type ==  Requested && <ChRequested/>
                    }
                    

                    <ChRequested/><hr/>
                    <ChOngoing/><hr/>
                    <ChProposed/><hr/>
                    <ChTimingOut/><hr/>
                    <hr/>
                

                </div>
            </Provider>
        );
    }
}

export default App;
