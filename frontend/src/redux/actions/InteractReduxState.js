import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
import { SET_ACTIVE_CHANNEL } from "../constants/InteractReduxState";
import {isValidAddress} from "ethereumjs-util";
//import web3 from "web3";

export default {

    handleAddressChange: (dispatch,textString) => {
        //clean up redundant returns
        return (dispatch) =>{
            dispatch({
                type: CHANGE_ADDRESS_TEXT,
                payload: {
                    textString:textString,
                    addressIsValid: isValidAddress(textString)
                }
            })
        }
    },
    setActiveChannel:(dispatch,channel) => {
        //hold all the channel stats in this function too
        return (dispatch) =>{
            dispatch({
                type: SET_ACTIVE_CHANNEL,
                payload: channel
            })
        }
    },

}