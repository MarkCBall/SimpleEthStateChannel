
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import InteractBlockchain from "./reducers/InteractBlockchain";
import InteractDatabase from "./reducers/InteractDatabase";
import InteractReduxState from "./reducers/InteractReduxState";


const rootReducer = combineReducers({
    InteractBlockchain,
    InteractDatabase,
    InteractReduxState
});

export default createStore(rootReducer, applyMiddleware(thunk));